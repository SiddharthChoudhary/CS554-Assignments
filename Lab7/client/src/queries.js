import gql from "graphql-tag";

const GET_IMAGES = gql`
  query unsplashImages(
    $pageNum:Int
  ){
    unsplashImages(pageNum:$pageNum){
      id
      url
      posterName
      description
      user_posted
      binned
      numBinned
    }
  }
`;
const GET_IMAGES_MY_POSTS = gql`
query {
  userPostedImages{
    id
    url
    posterName
    description
    user_posted
    binned
    numBinned
  }
}
`;

const POPULARITY=gql`
query{
  getTopTenBinnedPosts{
    id
    url
    posterName
    description
    user_posted
    binned
    numBinned
  }
}
`;


const GET_IMAGES_MY_BIN = gql`
query {
  binnedImages{
    id
    url
    posterName
    description
    user_posted
    binned
    numBinned
  }
}
`;
const UPLOAD_IMAGE=gql`
mutation uploadImage(
  $url:String!
  $description:String
  $posterName:String
){
  uploadImage(url:$url,description:$description,posterName:$posterName){
    id
    url
    posterName
    description
    user_posted
    binned
    numBinned
  }
}`;


const UPDATE_IMAGE=gql`
mutation updateImage($id: ID!, $url: String, $posterName: String, $description: String, $user_posted: Boolean, $binned: Boolean,$numBinned:Int){
         updateImage(id: $id, url: $url, posterName: $posterName,description: $description, user_posted: $user_posted, binned: $binned,numBinned:$numBinned){
      id
      url
      posterName
      description
      user_posted
      binned
      numBinned
    }
}`;

const DELETE_IMAGE=gql`
  mutation deleteImage($id: ID!){
      deleteImage(id: $id){
        id
        url
        posterName
        description
        user_posted
        binned
        numBinned
      }
  }`;


export default {
    GET_IMAGES,
    UPLOAD_IMAGE,
    GET_IMAGES_MY_POSTS,
    GET_IMAGES_MY_BIN,
    UPDATE_IMAGE,
    DELETE_IMAGE,
    POPULARITY
};