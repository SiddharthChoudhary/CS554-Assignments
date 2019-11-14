import React, { Component } from "react";
import { NavLink, BrowserRouter as Router, Route } from "react-router-dom";
import { Query, Mutation } from "react-apollo";


import logo from './logo.svg';
import "./App.css";
import Home from "./Home";
import { tsConstructorType } from "@babel/types";


function addMovie() {
  return (
    <Router>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></link>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Let's Add A Movie
        </p>
        <div class-="container">
          <div class="row">
          <Mutation
          mutation={queries.ADD_MOVIE}
        >
          {(addMovie, { data }) => (
            <form
              className="form"
              id="add-movie"
              onSubmit={e => {
                e.preventDefault();
                addMovie({
                  variables: {
                    title: title.value,
                    rating: rating.value,
                  }
                });
                title.value = "";
                rating.value = "";
                this.props.handleClose();
              }}
            >
              <div className="form-group">
                <label>
                  Title:
                  <br />
                  <input
                    ref={node => {
                      title = node;
                    }}
                    required
                    autoFocus={true}
                  />
                </label>
              </div>
              <br />
              <div className="form-group">
                <label>
                  Rating:
                  <br />
                  <input
                    ref={node => {
                      rating = node;
                    }}
                    required
                  />
                </label>
              </div>
              <br />
              <br />
              <br />
              <button className="button add-button" type="submit">
                Add Movie
              </button>
            </form>
          )}
        </Mutation>
          </div>
        </div>
      </header>
    </div>
    </Router>
  );
}

export default addMovie;
