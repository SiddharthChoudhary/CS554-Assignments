import React, { Component } from "react";
import { Query ,Mutation} from "react-apollo";
import {Grid,Col,Row,Container,Card,Button,Form} from 'react-bootstrap';
import queries from '../queries'
let images=[];
class MyBin extends Component{
    constructor(props){
        super(props);
        // this.state={
            //     pageNum:
            // }
        }
render(){
    return(
        <div>
            <Mutation mutation={queries.UPDATE_IMAGE}>
            {(update_image,{loading,error,data})=>
                (
                    <Query asyncMode query={queries.GET_IMAGES_MY_BIN}>
                        {({loading,error,data})=>{
                            if(loading) return <h1>loading...</h1>
                        if(error) return <h1>Error:{error}</h1>
                            if(!data){
                                return <h1>Data is null</h1>
                            }else{
                                console.log("Data",data)
                                return (
                                    <Container>
                                        <div class="row">
                                        {
                                        data.binnedImages.map((value,index)=>{
                                            return <div class="col"><Card style={{ marginTop:'100px',marginBottom:'100px',width: '25rem',background:'white'}}>
                                            <Card.Img variant="top" src={value.url} style={{height:"500px"}} />
                                            <Card.Body style={{padding:'inherit'}}>
                                            <Card.Title>Poster's Name: {value.poster_name}</Card.Title>
                                            <Card.Text>
                                                Description  {value.description?value.description:"Well Actually Nothing"}
                                            </Card.Text>
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
                                                                       binned:false
                                                                    }
                                                                })
                                                                if(error) alert(error)
                                                                if(data.binnedImages){ alert("Deleted From bin, Reload to see changes")}
                                                            }}>
                                            <Button variant="danger" type="submit">Delete From Bin</Button>
                                            </Form>
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
export default MyBin;