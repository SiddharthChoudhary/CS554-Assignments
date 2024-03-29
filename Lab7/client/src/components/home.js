import React, { Component } from "react";
import { Query,Mutation } from "react-apollo";
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'
import {Grid,Col,Row,Form,Container,Card, Button} from 'react-bootstrap';
import queries from '../queries'
let images=[];
class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            pageNum:1
        }
        this.handleShowMore=this.handleShowMore.bind(this);
    }
handleShowMore=()=>{
    console.log("Page Num is",this.state.pageNum);
    this.setState({
        pageNum:this.state.pageNum+1
    })
}
render(){
    return(
        <div>
            <Mutation mutation={queries.UPDATE_IMAGE}>
                {(update_image,{loading,error,data})=>
                (
                    <Query asyncMode query={queries.GET_IMAGES} variables={{pageNum: this.state.pageNum}}>
                        {({loading,error,data})=>{
                            if(loading) return <h1>loading...</h1>
                            if(error) return console.log(error)
                            if(!data){
                                console.log("Image is null")
                                return <h1>Data is null</h1>
                            }else{
                                return (                     
                                    <Container>
                                        <div class="row">
                                        {
                                        data.unsplashImages.map((value,index)=>{
                                            console.log(value);
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
                                                                       binned:true,
                                                                       numBinned:value.numBinned
                                                                    }
                                                                })
                                                                if(error) alert(error)
                                                                alert("Added to Bin, Reload to see changes")
                                                            }
                                                        }><Card style={{ marginTop:'100px',width: '25rem',background:'white'}}>
                                                            <Card.Img variant="top" src={value.url} style={{height:"500px"}} />
                                                            <Card.Body style={{padding:'inherit'}}>
                                                    <Card.Title>Poster's Name: {value.poster_name}{value.numBinned}</Card.Title>
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
                                        <Row><Col><h1></h1></Col></Row>
                                        <Row><Col><h1></h1></Col></Row>
                                        <Row >
                                            <Col>
                                            <Button size="lg" variant="danger" block onClick={()=>this.handleShowMore()}>Show More</Button> 
                                            </Col>
                                        </Row>
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