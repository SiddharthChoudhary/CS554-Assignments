import React,{Component} from 'react';
import axios from 'axios';
import noImage from './../default.png';
import { Redirect } from 'react-router-dom';



class berry extends Component{
    constructor(props){
        super(props);
        this.state={
            data:undefined
        };
    }
    async getAPIDATA(){
        const response = await axios.get(`https://pokeapi.co/api/v2/berry/${this.props.match.params.id}`);
        this.setState({
            data:response.data
        })
    }
    componentDidMount(){
        this.getAPIDATA();
    }
    displayData(){
    let data = this.state.data;
    const flavorsArray = data.flavors.map((element, i) => {
        return <li key={i}>{element.flavor.name}</li>
    });
    const firmness = data.firmness.name;
    const growthTime = data.growthTime;
    const name= data.name;
    const natural_gift_power=data.natural_gift_power;
    const natural_gift_type = data.natural_gift_type;
    const size = data.size;
    const smoothness = data.smoothness;
    const soilDryness= data.soilDryness;

    return (
        <article>
            <h1>Name:  {data.name}</h1>
            <div className = "row">
              <div className="col-8">
                <div className="mergin-right150">
                <h2>Flavors:</h2>
                <ul>{flavorsArray}</ul>
                <h2>Firmness : {firmness}</h2>
                <h2>Name : {name}</h2>
                <h2>Natural_Gift_Power : {natural_gift_power}</h2>
                <h2>Natural Gift Type : {natural_gift_type.name}</h2>
                <h2>Size : {size}</h2>
                <h2>Smoothness : {smoothness}</h2>
                <h2>Soil Dryness : {soilDryness}</h2>
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
export default berry;
