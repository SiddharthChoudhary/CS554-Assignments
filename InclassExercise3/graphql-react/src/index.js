import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "react-apollo";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";

import "./index.css";
import App from "../components/App";
import * as serviceWorker from "./serviceWorker";

const BASE_URL = "http://localhost:4000";

/*
he http link is a terminating link that fetches GraphQL results from a GraphQL endpoint over an http connection. 
The http link supports both POST and GET requests with the ability to change the http options on a per query basis. 
This can be used for authentication, persisted queries, dynamic uris, and other granular updates.
*/
const httpLink = new HttpLink({
  uri: BASE_URL,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

/*
Since don't need it right now so commenting it
*/
// const cache = new InMemoryCache();

//Finally, you can use both instantiated configurations, the link and the cache, to create the instance of the Apollo Client
const client = new ApolloClient({
  link: httpLink,
//   cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
