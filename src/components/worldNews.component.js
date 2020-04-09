import React, {Component} from 'react';
import WorldMap from './worldMap.component';
class WorldNews extends Component {
    constructor(props)
  {
    super(props);
    
  }
  render(){
    return(<div>
        <WorldMap/>
        </div>);
  }
}
export default WorldNews;