import React, { Component } from "react";
import { NavLink, BrowserRouter as Router, Route } from "react-router-dom";

import logo from './logo.svg';
import "./App.css";
import Home from "./Home";


function updateMovie() {
  return (
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></link>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Let's Update a movie
        </p>
        <div class-="container">
          <div class="row">
            <div class="col">
                
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default updateMovie;
