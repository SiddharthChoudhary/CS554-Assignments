import React, { Component } from "react";
import { Query } from "react-apollo";
import {Grid,Col,Row,Container,Card} from 'react-bootstrap';
import queries from '../queries'
let images=[];
class MyPosts extends Component{
    constructor(props){
        super(props);
        // this.state={
            //     pageNum:
            // }
        }
displayImages(imageArray){
    for(let i of imageArray){
        console.log("Got it",i);
        images.push("<Col>"+
        +"<Card style={{ width: '18rem' }}>"
        +"<Card.Img variant='top' src="+i.url+" />"
        +"<Card.Body>"
            +"<Card.Title>"+i.poster_name+"</Card.Title>"
            +"<Card.Text>"
            +i.description+
            +"the card's content."
            +"</Card.Text>"
            // +"<Button variant='primary'>"+i.binned?"Binned":"Not Binned"+"</Button>"
        +"</Card.Body>"
        +"</Card></Col>")
    }
    console.log(images)
}
render(){
    return(
        <div>
            <Query asyncMode query={queries.GET_IMAGES_MY_POSTS}>
            {({loading,error,data})=>{
                if(loading) return <h1>loading...</h1>
            if(error) return <h1>Error:{error}</h1>
                if(!data){
                    return <h1>Data is null</h1>
                }else{
                    console.log("Data",data)
                    this.displayImages(data.userPostedImages)
                    return (
                        <Container>
                            <div class="row">
                            {
                            data.userPostedImages.map((value,index)=>{
                                return <div class="col"><Card style={{ marginTop:'100px',width: '25rem',height:"650px",background:'white'}}>
                                <Card.Img variant="top" src={value.url} style={{height:"500px"}} />
                                <Card.Body>
                                  <Card.Title>Poster's Name: {value.posterName}</Card.Title>
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
        </div>
    )
}
}
export default MyPosts;