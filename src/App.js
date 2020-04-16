import React, { Component } from 'react';

import './App.css';
import "./styles.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Home from "./components/home.component";
class App extends Component{
    render(){
      return(
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/sign-in" component={Login}/>
          <Route path="/sign-up" component={SignUp}/>
          <Route path="/home" component={Home}/>
        </Switch>
      </Router>
        );
    }
}
export default App;