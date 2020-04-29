import React, { Component } from 'react';

import './App.css';
import "./styles.css";
import {Route, Redirect} from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Home from "./components/stateFull/home.statefull";
import CustomNavbar from "./components/navbar.component";
import NewsFeed from "./components/newsfeed.component";
import {MDBBox} from 'mdbreact';
class App extends Component{
    render(){
      return(
          <div>
            <Route exact path='/' render={() => <Redirect to='/' />} />
            <Route exact path="/sign-in" component={Login}/>
            <Route exact path="/sign-up" component={SignUp}/>
            <MDBBox tag="div">
            <CustomNavbar/>
              <Route exact path="/" component={Home}/>
              <Route exact path="/newsfeed" component={NewsFeed}/>
            </MDBBox>
          </div>
      );
    }
}
export default App;