import React, {Component} from 'react';
import WorldMap from './worldMap.component';

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
    // console.log(nextProps.coordinatedData)
  }
  componentDidUpdate(props) {
  }
  render(){
    
    return(
      <div className="container-fluid" style={{marginTop: "1%"}}>
        {this.state.coordinatedData.length > 0 && 
         <WorldMap coordinatedData={this.state.coordinatedData}/>
        }
         
        
      </div>
    );
  }
}
export default WorldNews;