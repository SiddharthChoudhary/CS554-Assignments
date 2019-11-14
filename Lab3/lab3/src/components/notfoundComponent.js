import React,{Component} from 'react';
import axios from 'axios';
import noImage from './../default.png';
import { Redirect } from 'react-router-dom';
import ServerStatus from 'react-server-status';

class notFoundComponent extends Component{
    render() {
     return(
         <div>
             <a hre="#">
             I have got nothing for you. I am sorry. Try something else or try not to be clever
             </a>
         </div>
     )
  }
}
export default notFoundComponent;
