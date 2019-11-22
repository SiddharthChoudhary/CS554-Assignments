import React from 'react';
import logo from './logo.svg';
import Home from './components/home'
import MyBin from './components/mybin'
import MyPosts from './components/myposts'
import NewPost from './components/newpost'

import {Container,Row,Col,Nav} from 'react-bootstrap'
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div>
            <Router>
              <Container>
                <Row className="header" style={{display:'flex'}}>
                  <Col>
                    <Link to="/mybin">My Bin</Link>
                  </Col>
                  <Col>
                    <Link to="/myposts">My Posts</Link></Col>
                  <Col>
                    <Link to="/newpost">New Post</Link>
                  </Col>
                </Row>
              </Container>
              <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/mybin" component={MyBin} />
              <Route exact path="/myposts" component={MyPosts}/>
              <Route exact path="/newpost" component={NewPost}/>
              </Switch>
            </Router>
          </div>
      </header>
    </div>
  );
}

export default App;
