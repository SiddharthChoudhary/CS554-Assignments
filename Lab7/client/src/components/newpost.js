import React, { Component } from "react";
import { Mutation } from "react-apollo";
import {Grid,Col,Row,Container,Form,Card,Button} from 'react-bootstrap';
import queries from '../queries'
let images=[];
class NewPost extends Component{
    constructor(props){
        super(props);
        this.state={
                imageUrl:'',
                description:'',
                author_name:''
            }
        this.handleAuthorNameChange=this.handleAuthorNameChange.bind(this);
        this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
        this.handleImageUrlChange=this.handleImageUrlChange.bind(this);
    }
handleAuthorNameChange(event){
    this.setState({
        author_name:event.target.value
    })
}
handleDescriptionChange(event){
    this.setState({
        description:event.target.value
    })
}
handleImageUrlChange(event){
    this.setState({
        imageUrl:event.target.value
    })
}

render(){
    return(
        <div>
            <Container>
                <Row>
                    <Col>
                    <Mutation mutation={queries.UPLOAD_IMAGE}>
                      {(uploadImage, {loading,error,data})=>(
                        <Form onSubmit={
                            e=>{
                                e.preventDefault();
                                uploadImage({
                                    variables:{
                                        url:this.state.imageUrl,
                                        posterName:this.state.author_name,
                                        description:this.state.description
                                    }
                                })
                                if(error) alert(error);
                                alert("Uploaded");
                            }
                        }>
                                <Form.Group controlId="imageUrl">
                                    <Form.Label>Image Url</Form.Label>
                                    <Form.Control required type="text" placeholder="Image url" value={this.state.imageUrl} onChange={this.handleImageUrlChange}/>
                                    <Form.Text className="text-muted">
                                        Please don't test our patience by giving nothing here, we will need a url
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="imageDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="description" value={this.state.description} onChange={this.handleDescriptionChange} />
                                    <Form.Text className="text-muted">
                                    Description could be empty as well, but choose this on your own risk
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="imageAuthorName">
                                    <Form.Label>Author Name</Form.Label>
                                    <Form.Control type="text" placeholder="Author Name" value={this.state.author_name} onChange={this.handleAuthorNameChange}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                      )
                    }
                        </Mutation>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
}
export default NewPost;