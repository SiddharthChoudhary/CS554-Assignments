import React, { Component } from "react";
import { Query,Mutation } from "react-apollo";
import {Grid,Col,Row,Form,Container,Card, Button} from 'react-bootstrap';
import queries from '../queries'
let images=[];
class Home extends Component{
    constructor(props){
        super(props);
        // this.state={
            //     pageNum:
            // }
        }
displayImages(imageArray){
    for(let i of imageArray){
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
}
render(){
    return(
        <div>
            <Mutation mutation={queries.UPDATE_IMAGE}>
                {(update_image,{loading,error,data})=>
                (
                    <Query asyncMode query={queries.GET_IMAGES} variables={{pageNum: 1}}>
                        {({loading,error,data})=>{
                            if(loading) return <h1>loading...</h1>
                            if(error) return console.log(error)
                            if(!data){
                                console.log("Image is null")
                                return <h1>Data is null</h1>
                            }else{
                                this.displayImages(data.unsplashImages)
                                return (                     
                                    <Container>
                                        <div class="row">
                                        {
                                        data.unsplashImages.map((value,index)=>{
                                            return <div class="col">
                                                <Form onSubmit={
                                                            e=>{
                                                                e.preventDefault();
                                                                update_image({
                                                                    variables:{
                                                                       id:value.id,
                                                                       url: value.url,
                                                                       posterName:value.posterName,
                                                                       description:value.description,
                                                                       user_posted:value.user_posted,
                                                                       binned:true
                                                                    }
                                                                })
                                                            }
                                                        }><Card style={{ marginTop:'100px',width: '25rem',height:"650px",background:'white'}}>
                                                            <Card.Img variant="top" src={value.url} style={{height:"500px"}} />
                                                            <Card.Body>
                                                            <Card.Title>Poster's Name: {value.poster_name}</Card.Title>
                                                            <Card.Text>
                                                                Description  {value.description?value.description:"Well Actually Nothing"}
                                                            </Card.Text>
                                                            </Card.Body>
                                                            <Button type="submit">ADD TO BIN</Button>
                                                        </Card>
                                                </Form>
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
                )}</Mutation>
        </div>
    )
}
}
export default Home;