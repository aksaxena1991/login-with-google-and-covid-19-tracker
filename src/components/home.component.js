import React, {Component} from 'react';

import Chart from "react-google-charts";
import CustomNavbar from "./navbar.component";
import { MDBBox, MDBRow } from 'mdbreact';
import WorldNews from './worldNews.component';

class Home extends Component {
  
  constructor(props){
    super(props);
  }
  
  
  componentDidUpdate(){
  
  }
  render(){
    return(
    <MDBBox tag="div">
      <CustomNavbar/>
      <WorldNews/>
    </MDBBox>);
  }
}
export default Home;