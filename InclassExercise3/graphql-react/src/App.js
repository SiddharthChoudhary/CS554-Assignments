import React, { Component } from "react";
import { NavLink, BrowserRouter as Router, Route } from "react-router-dom";
import {Query} from "react-apollo"
import logo from './logo.svg';
import "./App.css";
import addMovie from "./components/addMovie"
import updateMovie from "./components/updateMovie"
import deleteMovie from "./components/deleteMovie"
import queries from './queries.js'


function App() {
  return (
    <Router>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></link>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Let's Have some fun with our App.
        </p>
        <div class-="container">
          <div class="row">
            <div class="col">
              <Route path="\addmovie" component={addMovie}>Add a movie</Route>
            </div>
            <div class="col">
              <Route path="\updateMovie" component={updateMovie}>Update a movie</Route>
            </div>
            <div class="col">
              <Route path="\deleteMovie" component={deleteMovie}>Delete a movie</Route>
            </div>
          </div>
          <div class="row">
              <Query query={queries.GET_MOVIES}>
              {({ data }) => {
                const { movies } = data;
                if (!movies) {
                  return null;
                }
                return (
                  <div>
                    {movies.map(movie => {
                      return (
                        <div className="card" key={movie.id}>
                          <div className="card-body">
                            <h5 className="card-title">
                              {movie.title}
                            </h5>
                            Rating: {movie.rating}
                            <br />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </Query>
          </div>
        </div>
      </header>
    </div>
    </Router>
  );
}

export default App;
