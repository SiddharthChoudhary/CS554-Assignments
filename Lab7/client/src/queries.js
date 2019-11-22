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
  }
}`;


const UPDATE_IMAGE=gql`
mutation updateImage($id: ID!, $url: String, $posterName: String, $description: String, $user_posted: Boolean, $binned: Boolean){
         updateImage(id: $id, url: $url, posterName: $posterName,description: $description, user_posted: $user_posted, binned: $binned){
      id
      url
      posterName
      description
      user_posted
      binned
    }
}`;

export default {
    GET_IMAGES,
    UPLOAD_IMAGE,
    GET_IMAGES_MY_POSTS,
    GET_IMAGES_MY_BIN,
    UPDATE_IMAGE
};