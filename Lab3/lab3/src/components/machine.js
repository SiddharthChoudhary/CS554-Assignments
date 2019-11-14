import React,{Component} from 'react';
import axios from 'axios';
import noImage from './../default.png';
import { Redirect } from 'react-router-dom';



class machine extends Component{
    constructor(props){
        super(props);
        this.state={
            data:undefined
        };
    }
    async getAPIDATA(){
        const response = await axios.get(`https://pokeapi.co/api/v2/machine/${this.props.match.params.id}`);
        this.setState({
            data:response.data
        })
    }
    componentDidMount(){
        this.getAPIDATA();
    }
    displayData(){
    let data = this.state.data;
    const id = data.id;
    const itemName = data.item.name;
    const moveName= data.move.name;
    const version_group=data.version_group.name;

    return (
        <article>
            <h1>Id:  {id}</h1>
            <div className = "row">
              <div className="col-8">
                <div className="mergin-right150">
                <h2>ItemName : {itemName}</h2>
                <h2>Move : {moveName}</h2>
                <h2>Version_Group : {version_group}</h2>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
        </article>
    );
    }
    render() {
    let body = null;

    if (this.state.data) {
      body = (
          <div className="App-body">
              {this.displayData()}
          </div>
      );
    }
    return body;
  }
}
export default machine;
