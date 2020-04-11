import React, {Component} from 'react';
import WorldMap from './worldMap.component';

class WorldNews extends Component {
 
  
    constructor(props)
  {
    super(props);
  
    
  }
  
  
  render(){
    
    return(
      <div className="row" style={{marginTop: "1%"}}>
        <div className="col-12 col-lg-6 col-xl"></div>
        <div className="col-12 col-lg-6 col-xl">
          <WorldMap/>
        </div>
      </div>
    );
  }
}
export default WorldNews;