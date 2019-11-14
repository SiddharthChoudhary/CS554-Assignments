import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import pokemonId from './pokemon';
import pokemonListToDisplay from './pokemonsListToDisplay';
function Pokemon(){
        return (
            <div>
                <Switch>
                    <Route path = "/pokemon/page/:pageNumber" exact component={pokemonListToDisplay} />
                    <Route path = "/pokemon/:id" exact component={pokemonId} />
                </Switch>
            </div>
        )
}

export default Pokemon;