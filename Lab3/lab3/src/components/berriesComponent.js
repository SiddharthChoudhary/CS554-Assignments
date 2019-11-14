import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import berry from './berries';
import berriesList from './berriesListToDisplay';
function berries(){
        return (
            <div>
                <Switch>
                    <Route path = "/berries/page/:pageNumber" exact component={berriesList} />
                    <Route path = "/berries/:id" exact component={berry} />
                </Switch>
            </div>
        )
}

export default berries;