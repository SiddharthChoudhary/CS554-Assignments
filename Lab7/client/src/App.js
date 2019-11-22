import React from 'react';
import logo from './icon.png';
import Home from './components/home'
import MyBin from './components/mybin'
import MyPosts from './components/myposts'
import NewPost from './components/newpost'
import Popularity from './components/popularity'

import {Container,Row,Col,Nav} from 'react-bootstrap'
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div>
            <Router>
              <Container style={{marginBottom:'20px'}}>
                <Row className="header" style={{display:'flex',fontSize:'large'}}>
                  <Col>
                    <Link to="/"><img src={logo} small></img></Link>
                  </Col>
                  <Col></Col>
                  <Col>
                    <Link to="/mybin">My Bin</Link>
                  </Col>
                  <Col>
                    <Link to="/myposts">My Posts</Link></Col>
                  <Col>
                    <Link to="/newpost">New Post</Link>
                  </Col>
                  <Col><Link to="/popularity">Popularity</Link></Col>
                  <Col></Col>
                </Row>
              </Container>
              <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/mybin" component={MyBin} />
              <Route exact path="/myposts" component={MyPosts}/>
              <Route exact path="/popularity" component={Popularity}/>
              <Route exact path="/newpost" component={NewPost}/>
              </Switch>
            </Router>
          </div>
      </header>
    </div>
  );
}

export default App;
