const { ApolloServer, gql } = require("apollo-server");
const lodash = require("lodash");
const uuid = require("node-uuid");
//some Mock data
let Movies = [
  {
    id: uuid.v4(),
    title: "Homecoming",
    Rating: 4,
  },
  {
    id: uuid.v4(),
    title: "Avengers",
    Rating: 2,
  },
  {
    id: uuid.v4(),
    title: "Black Panther",
    Rating: 5,
  },
  {
    id: uuid.v4(),
    title: "The Proposal",
    Rating: 5,
  },
  {
    id: uuid.v4(),
    title: "Wonder woman",
    Rating: 5,
  }
];

//Create the type definitions for the query and our data
const typeDefs = gql`
  type Query {
    Movies: [Movies],
    movie(id:String):Movies
  }
  type Movies {
    id: Int
    title: String
    Rating: Int
    numOfMovies: Int
  }
  type Mutation {
    addMovie(
      Rating: Int!
      title: String!
    ): Movies
    removeMovie(id: Int!): [Movies]
    editMovie(
      id: String!
      Rating: Int
      title: String
    ): Movies
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
    Movies: (_, args) => Movies.filter(e => e.Rating === args.id)[0],
    Movies: () => Movies,
  },
  Movies: {
    numOfMovies: parentValue => {
      console.log(`parentValue in Movies`, parentValue);
      return Movies.filter(e => e.id === parentValue.id).length;
    }
  },
  Mutation: {
    addMovie: (_, args) => {
      const newMovie = {
        id: uuid.v4(),
        rating: args.rating,
        title: args.title,
      };
      movies.push(newMovie);
      return newMovie;
    },
    removeMovie: (_, args) => {
      return lodash.remove(Movies, e => e.id == args.id);
    },
    editMovie: (_, args) => {
      let newMovie;
      Movies = Movies.map(e => {
        if (e.id === args.id) {
          if (args.rating) {
            e.rating = args.rating;
          }
          if (args.title) {
            e.title = args.title;
          }
          if (args.id) {
            e.id = args.id;
          }
          newMovie = e;
          return e;
        }
        return e;
      });
      return newMovie;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});
