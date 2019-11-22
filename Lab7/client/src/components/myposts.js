import React, { Component } from "react";
import { Query,Mutation } from "react-apollo";
import {Grid,Col,Row,Container,Card,Form,Button} from 'react-bootstrap';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'
import queries from '../queries'
let images=[];
class MyPosts extends Component{
    constructor(props){
        super(props);
        // this.state={
            //     pageNum:
            // }
        }

render(){
    return(
        <div>
            <Container>
                <Link to="/newpost"><Button variant="danger" size="lg" block>Upload Image</Button></Link>
            </Container>
            <Mutation mutation={queries.UPDATE_IMAGE}>
            {(update_image,{loadingImage,errorImage,dataImage})=>
                (
                <Query asyncMode query={queries.GET_IMAGES_MY_POSTS}>
                {({loading,error,data})=>{
                    if(loading) return <h1>loading...</h1>
                if(error) return <h1>Error:{error}</h1>
                    if(!data){
                        return <h1>Data is null</h1>
                    }else{
                        return (
                            <Container>
                                <div class="row">
                                {
                                data.userPostedImages.map((value,index)=>{
                                    return <div class="col"><Card style={{ marginTop:'100px',marginBottom:'100px',width: '25rem',background:'white'}}>
                                    <Card.Img variant="top" src={value.url} style={{height:"500px"}} />
                                    <Card.Body style={{padding:'inherit'}}>
                                    <Card.Title>Poster's Name: {value.posterName}</Card.Title>
                                    <Card.Text>
                                        Description  {value.description?value.description:"Well Actually Nothing"}
                                    </Card.Text>
                                    <Form onSubmit={  e=>{          e.preventDefault();
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
                                                                    if(errorImage) alert(error)
                                                                    if(data.userPostedImages.length>0) alert("Added, Reload to see changes")
                                                                }
                                                                }>
                                    <Button variant="danger" type="submit">Add to Bin</Button>
                                    </Form>
                                    <Mutation mutation={queries.DELETE_IMAGE}>
                                        {(delete_image,{loading,error,dataImage})=>(
                                        <Form onSubmit={e=>{
                                            e.preventDefault();
                                            delete_image({
                                                variables:{
                                                    id:value.id
                                                }
                                            })
                                            if(error) alert(error)
                                            alert("Deleted, Reload to see changes");
                                        }}>
                                        <Button variant="dark" type="submit">Delete</Button>
                                        </Form>
                                    )}
                                    </Mutation>
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
            </Mutation>
        </div>
    )
}
}
export default MyPosts;