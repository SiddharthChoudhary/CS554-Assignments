import React,{Component} from 'react';
import {BrowserRouter as Redirect,Link} from 'react-router-dom'

import axios from 'axios';
const limit = 20;
class machinesList extends Component{
constructor(props){
    super(props);
    this.state={
        data:undefined,
        pageNumber:(Number(this.props.match.params.pageNumber)),
        noOfPages:undefined,
        notfound:false
    }        
}
componentDidMount(){
     this.getMachineData(Number(this.props.match.params.pageNumber));
}
componentWillReceiveProps(){
    this.getMachineData(Number(this.props.match.params.pageNumber));
}
comparePageNumber(pageNumber,offset,response){
let count = response.data.count;
let numberOfPagesPossible=Math.ceil(Number(count)/20);
let noOfPages=
(pageNumber===numberOfPagesPossible)? 0 :
                            ((pageNumber<=(numberOfPagesPossible-3)) ? 3 :
                                ((pageNumber>=(numberOfPagesPossible-3))&&(pageNumber<numberOfPagesPossible) ? numberOfPagesPossible-pageNumber : -1))

if(noOfPages==-1){
    this.setState({notfound:true});
    return;
}
console.log("No of pages",noOfPages,numberOfPagesPossible,this.state.pageNumber);

    this.setState({
        noOfPages:noOfPages,
        pageNumber:pageNumber,
        data:response.data
    })
}
async getMachineData(pageNumber){
    let offset = Number(pageNumber);
    let number
    offset=pageNumber?limit*(pageNumber-1):0;
    const response = await axios.get("https://pokeapi.co/api/v2/machine?offset=" + offset + "&limit=20");
    console.log("Offset",offset,pageNumber);
    this.comparePageNumber(pageNumber,offset,response)
}
render(){
    let body = null;
        let li = null;
        let previous = null;
        let next = null;

        if(this.state.notfound)
        {
            body = (
                <div>
                    <Redirect to="/notfound" status={404}/>
                </div>
            )
        }
        else
        {
            li = this.state.data && this.state.data.results.map(machine => (
                <li key={machine.url.split("/")[6]}>
                   <Link to={'/machines/'+machine.url.split("/")[6]}>{machine.url.split("/")[6]}-->{machine.url}</Link>
                </li>
            ));
                    // if(this.state.noOfPages >= 0 && this.state.pageNumber > 0)
                    // {
                    if(this.state.data){
                            if(this.state.data.previous)
                            {
                                previous =  <Link to={'/machines/page/'+ (Number(this.state.pageNumber) - 1)}>Previous</Link>
                            }
                           if(this.state.data.next)
                            {
                                next = <Link to={'/machines/page/'+(Number(this.state.pageNumber) + 1)}>Next</Link>
                            }
                    }

            body = (
                <div >
                    <ul>
                        {li}
                    </ul>
    
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                        </ul>
                            {previous}-
                            {next}
                    </nav>
                </div>
            )
        }
        return body;
}
}

export default machinesList;
