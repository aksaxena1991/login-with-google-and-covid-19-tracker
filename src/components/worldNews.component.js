import React, {Component} from 'react';
import WorldMap from './worldMap.component';
import axios from 'axios';
class WorldNews extends Component {
 
  state = {
        url:{
          stateDistrictWiseAPIURL: 'https://api.covid19india.org/state_district_wise.json',
          stateWiseAPIURL:'https://api.covid19india.org/data.json',
        },
        data: {
          stateDistrictData: null,
          stateData: null
        }
    }
    constructor(props)
  {
    super(props);
  
    
  }
  getStateDistrictResponse = () => {
    axios.get(this.state.url.stateDistrictWiseAPIURL).then((response) => {
    this.setState({data:{
      ...this.state.data,
      stateDistrictData: response.data
    }});
    });
  };
  getStateWiseResponse = () => {
    axios.get(this.state.url.stateWiseAPIURL).then((response) => {
      this.setState({data:{
        ...this.state.data,
        stateData: response.data
    }});
    });
  };
  componentWillMount() {
    this.getStateDistrictResponse();
    this.getStateWiseResponse();
  }
  componentDidUpdate() {
    console.log(this.state);
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