import React, { Component } from "react";
import { Query ,Mutation} from "react-apollo";
import {Grid,Col,Row,Container,Card,Button,Form} from 'react-bootstrap';
import queries from '../queries'
let images=[];
class Popularity extends Component{
    constructor(props){
        super(props);
        // this.state={
            //     pageNum:
            // }
        }
render(){
    return(
        <div>
                    <Query asyncMode query={queries.POPULARITY}>
                        {({loading,error,data})=>{
                            console.log("Data is",data)
                            if(loading) return <h1>loading...</h1>
                        if(error) return <h1>Error:{error}</h1>
                            if(!data.getTopTenBinnedPosts){
                                return <h1>Data is null</h1>
                            }else{
                                return (
                                    <Container>
                                        <div class="row">
                                        {
                                        data.getTopTenBinnedPosts.map((value,index)=>{
                                            return <div class="col"><Card style={{ marginTop:'100px',marginBottom:'100px',width: '25rem',background:'white'}}>
                                            <Card.Img variant="top" src={value.url} style={{height:"500px"}} />
                                            <Card.Body style={{padding:'inherit'}}>
                                            <Card.Title>Poster's Name: {value.poster_name}</Card.Title>
                                            <Card.Text>
                                                Description  {value.description?value.description:"Well Actually Nothing"}
                                            </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        </div>
                                        })
                                        }
                                        </div>
                                    </Container>
                                    )
                                    }
                                }
                                } 
                                </Query>
                )}
        </div>
    )
}
}
export default Popularity;