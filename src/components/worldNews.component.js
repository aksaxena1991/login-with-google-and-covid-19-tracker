import React, {Component} from 'react';
import WorldMap from './worldMap.component';
import {MDBBox, MDBRow} from 'mdbreact';
class WorldNews extends Component {
  
  constructor(props)
  {
    super(props);
    this.state = {
      coordinatedData:[]
    }  
    
  }

  componentWillReceiveProps(nextProps, nextContext) {
this.setState({coordinatedData: nextProps.coordinatedData});
    
  }
  componentDidUpdate(props) {
  }
  render(){
    
    return(
      <MDBRow style={{  marginTop: "0.5%" }}>
        {this.state.coordinatedData.length > 0 && 
         <WorldMap coordinatedData={this.state.coordinatedData}/>
        }
         
        
      </MDBRow>
    );
  }
}
export default WorldNews;