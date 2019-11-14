import gql from "graphql-tag";

const GET_MOVIES = gql`
  query {
    movies {
      id
      title
      rating
    }
  }
`;

const ADD_MOVIE = gql`
  mutation createMovie(
    $title: String!
    $rating: String!
    $id: Int!
  ) {
    addMovie(
      title: $title
      rating: $rating
      id: $id
    ) {
      id
      title
      rating
    }
  }
`;

const DELTE_MOVIE = gql`
  mutation deleteMovie($id: String!) {
    removeMovie(id: $id) {
      id
      title
      rating
    }
  }
`;

const EDIT_MOVIE = gql`
  mutation changeMovie(
    $id: String!
    $title: String
    $rating: String
  ) {
    editMovie(
      id: $id
      rating: $rating
      title: $title
    ) {
      id
      title
      rating
    }
  }
`;

export default {
  ADD_MOVIE,
  GET_MOVIES,
  DELTE_MOVIE,
  EDIT_MOVIE
};