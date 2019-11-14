import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import machine from './machine';
import machinesList from './machineListToDisplay';
function machines(){
        return (
            <div>
                <Switch>
                    <Route path = "/machines/page/:pageNumber" exact component={machinesList} />
                    <Route path = "/machines/:id" exact component={machine} />
                </Switch>
            </div>
        )
}

export default machines;