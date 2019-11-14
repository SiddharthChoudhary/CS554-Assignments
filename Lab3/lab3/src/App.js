import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import pokemon from './components/pokemonComponent'
import berries from './components/berriesComponent'
import machine from './components/machineComponent'
import notFoundComponent from './components/notfoundComponent'

function App() {
  return (
    <Router>
    <script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin
/>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      <div className="App-body">
            <h1>Welcome to the PokeMon WOrld!</h1>
            <div class="row">
              <div class="col">
              <Link className="pokemonLink" to="/pokemon/page/1">
                Pokemon
              </Link>
              </div>
              <div class="col">
              <Link className="berriesLink" to="/berries/page/1">
                Berries 
              </Link>
              </div>
              <div class="col">
              <Link className="machinesLink" to="/machines/page/1">
                Machines
              </Link>
              </div>
          </div>
          </div>
      <Route path="/pokemon" component = { pokemon } />
            <Route path="/berries" component = { berries } />
            <Route path="/machines" component = { machine } />
            <Route path="/notfound" component={ notFoundComponent }/>
      </header>
    </div>
    </Router>
  );
}

export default App;
