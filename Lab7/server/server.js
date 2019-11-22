const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios")
const uuid = require("node-uuid");
const async = require("async");
const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const typeDefs = gql`
type Query {
  images:[ImagePost]
  test:[ImagePost]
  unsplashImages(pageNum:Int):[ImagePost]
  binnedImages:[ImagePost]
  userPostedImages:[ImagePost]
}
type ImagePost {
  id: ID!
  url: String!
  posterName: String!
  description: String
  user_posted: Boolean!
  binned: Boolean!
}
type Mutation {
  uploadImage(url: String!, description: String, posterName: String):ImagePost
  updateImage(id: ID!, url: String, posterName: String, description: String, user_posted: Boolean, binned: Boolean):ImagePost
  deleteImage(id: ID!): ImagePost
}
`;

/* parentValue - References the type def that called it
so for example when we execute numOfEmployees we can reference
the parent's properties with the parentValue Paramater
*/

/* args - Used for passing any arguments in from the client
for example, when we call 
addEmployee(firstName: String!, lastName: String!, employerId: Int!): Employee

*/

const resolvers = {
  Query: {
    unsplashImages:async (_,args) => {
      let images=[];
      let results = await axios.get("https://api.unsplash.com/photos/?client_id=dc2fd8b97d3bab5ad1087adcb9b74a431eabbedbf945261f8160f40e2f6cc304&page="+args.pageNum)
      .then(async function(response){
        for(let i of response.data){
                    response = i;
                    let description=response.description?response.description:response.alt_description;
                    let image={
                      id:response.id,
                      url:response.urls.small,
                      posterName:response.user.name,
                      description:description,
                      user_posted:false,
                      binned:false
                    }
                    images.push(image);
                  }
                  return await images;
                })
                console.log(results)
          return results;
              },
    // imagePosts: () => images
    binnedImages:async ()=>{
      let image=[];
      let images = await client.lrangeAsync("images",0,-1);
          if(!images){
              //no uploads
            }else{
              for(let i in images){
                let posted_images=JSON.parse(images[i])
                if(posted_images.binned){
                  const img={
                    id:posted_images.id,
                    url:posted_images.url,
                    posterName:posted_images.posterName,
                    description:posted_images.description,
                    user_posted:posted_images.user_posted,
                    binned:posted_images.binned
                  }
                  image.push(img)
                  }
                }
          }
        return image;
      },
    userPostedImages:async()=>{
      let image=[];
      let images = await client.lrangeAsync("images",0,-1);
          if(!images){
              //no uploads
            }else{
              for(let i in images){
                let posted_images=JSON.parse(images[i])
                //only do this if user posted is true
                if(posted_images.user_posted){
                   const img={
                    id:posted_images.id,
                    url:posted_images.url,
                    posterName:posted_images.posterName,
                    description:posted_images.description,
                    user_posted:posted_images.user_posted,
                    binned:posted_images.binned
                  }
                  image.push(img)
                }
                }
          }
        return image;
        }
  },
  Mutation: {
    uploadImage:async (_, args) => {
      let id =uuid.v4()
      const newImage = {
        id: id,
        url: args.url,
        posterName: args.posterName,
        description: args.description,
        user_posted:true,
        binned:false
      };
      try{
        let ifIdinCache = await client.getAsync(id);
        if(!ifIdinCache){
          await client.lpush("images",JSON.stringify(newImage),redis.print);
        }
      }catch(e){
        return 'redis part failed';
      }
      return newImage;
    },
    updateImage:async (_, args) => {
      //create newObj
      console.log("I Came in");
      const newObj={
        id:args.id,
        url:args.url,
        posterName:args.posterName,
        description:args.description,
        user_posted:args.user_posted,
        binned:args.binned
      }
      //if user has binned the image  
      if(args.binned){
        let found = false;
        let images = await client.lrangeAsync("images",0,-1);
        if(!images){
          //no uploads
        }else{
            //scan the whole array and find out which one matches the id, and if none matches
            for(let i in images){
              let posted_images=JSON.parse(images[i])
              if(posted_images.id===args.id){
                found=true;
              }
            }
          //if it's not in cache, i.e., found is false then add in the cache
          if(!found){
            client.lpush("images",JSON.stringify(newObj),redis.print);
          }   
       }
     } //i.e., if the image is unbinned
      else{
        let found=false;
        let images=await client.lrangeAsync("images",0,-1);
        for(let i in images){
          let posted_images=JSON.parse(images[i])
          if(posted_images.id===args.id){
            found=true;
            newObj.binned=posted_images.binned;
            let obj=JSON.stringify(newObj);
            //first remove the object
            await client.lrem("images",0,obj);
            //and then add a new object with inverse binned value
            newObj.binned=!newObj.binned;
            obj = JSON.stringify(newObj);
            await client.lpush("images",obj);
          }
        }
      }
      return newObj;  
    },

    deleteImage:async (_, args) => {
        // return lodash.remove(employees, e => e.id == args.id);
        let images = await client.lrangeAsync("images",0,-1);
        if(!images){
          //no uploads
        }else{
          //scan the whole array and find out which one matches the id
          for(let i in images){
            let posted_images=JSON.parse(images[i])
            if(posted_images.id===args.id){
              const img={
                id:posted_images.id,
                url:posted_images.url,
                posterName:posted_images.posterName,
                description:posted_images.description,
                user_posted:posted_images.user_posted,
                binned:posted_images.binned
              }
            }
            let obj=JSON.stringify(img);
            await client.lrem("images",0,obj);
            };
          }
      if(!await client.getAsync(args.id)){
        //do nothing
      }else{
        client.del(args.id);
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});