import React, {Component} from 'react';
import axios from 'axios';
import Chart from "react-google-charts";
import CustomNavbar from "./navbar.component";
import { MDBBox, MDBRow } from 'mdbreact';
import WorldNews from './worldNews.component';
import Grid from './grid.component';
class Home extends Component {
  
  object = {
    color:{
      deathColor:'#CC0000',
      activeColor:'#FF8800',
      recoveredColor:'#007E33',
      totalColor:'#0099CC'
    },
    coordinatedData: []
  }
  titleChartTotalCasesData = [
  ['x', 'Total cases']
  ];
  titleChartDailyRecoveredData = [
    ['x', 'Total Recovered']
  ];
  titleChartDailyDeathData = [
    ['x', 'Total Death']
  ];
  titleChartDailyActiveData = [
    ['x', 'Total Active']
  ];
  functionCounter = 0;
  constructor(props){
    super(props);
    this.state = {
        url:{
          stateDistrictWiseAPIURL: 'https://api.covid19india.org/state_district_wise.json',
          stateWiseAPIURL:'https://api.covid19india.org/data.json',
        },
        data: {
          stateDistrictData: null,
          stateData: null
        },
        object:{
          totalCases:0,
          totalActive:0,
          totalDeath:0,
          totalRecovered:0,
        },
        coordinatedData: [],
        css:{
          hidden:false
        }
    }
  }
  tileChartData = (res) => {

  res.cases_time_series.map((item,key)=> {
    const state = this.state;
    state.object.totalCases = +parseInt(item.totalconfirmed);
    state.object.totalActive = +(parseInt(item.totalconfirmed) - parseInt(item.totalrecovered) - parseInt(item.totaldeceased));
    state.object.totalDeath = +parseInt(item.totaldeceased);
    state.object.totalRecovered = +parseInt(item.totalrecovered);
    this.setState({state});
    // console.log(parseInt(item.totalconfirmed));
    this.titleChartTotalCasesData.push([key, parseInt(item.totalconfirmed)]);
    this.titleChartDailyDeathData.push([key,parseInt(item.totaldeceased)])
    this.titleChartDailyRecoveredData.push([key,parseInt(item.totalrecovered)])
    this.titleChartDailyActiveData.push([key, (parseInt(item.totalconfirmed) - parseInt(item.totalrecovered) - parseInt(item.totaldeceased))])
  });
  
  
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
    this.tileChartData(response.data);
    });
  };
  componentWillMount() {
    this.getStateDistrictResponse();
    this.getStateWiseResponse();
    
  }
  componentDidUpdate() {
if ((this.state.data.stateData != null) && (this.state.data.stateDistrictData != null)) {
  this.functionCounter++;
  if (this.functionCounter === 1) {
    this.dataMapping(this.state.data.stateData);
    return false;
  }
}

  }

  dataMapping = (param2) => {
     param2.statewise.forEach((item2,key2) => {
       axios({
              "method": "GET",
              "url": "https://geoapify-platform.p.rapidapi.com/v1/geocode/search",
              "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "geoapify-platform.p.rapidapi.com",
                "x-rapidapi-key": "4afa9d804fmshb82f26d7850288fp1fe303jsn995d5ec4f72c"
              },
              "params": {
                "lang": "en",
                "apiKey": "700109c41a4640e98b79466d164cba52",
                "text": item2.state
              }
            }).then(response => {
              if(response.status === 200) {
                this.object.coordinatedData.push( {
                  lat:response.data.features[0]['properties'].lat,
                  lng : response.data.features[0]['properties'].lon,
                  state:item2,
                  active:item2.active,
                  confirmed : item2.confirmed,
                  deaths : item2.deaths,
                  deltaconfirmed : item2.deltaconfirmed,
                  deltadeaths : item2.deltadeaths,
                  deltarecovered : item2.deltarecovered,
                  lastupdatedtime : item2.lastupdatedtime,
                  recovered : item2.recovered,
                  statecode : item2.statecode
                });
                this.setState({coordinatedData:this.object.coordinatedData});

              }
            });
        
          });


    }  
  
  render(){

    return(
    <MDBBox tag="div">
    
    <CustomNavbar/>
      {
          (this.state.coordinatedData.length > 0) && 
          <WorldNews coordinatedData = {this.state.coordinatedData}/>
      }
      <MDBBox className="container-fluid" style = {{ width: "100%", marginTop: "1%" }} >
      <MDBRow>
          <div className="col-12 col-lg-6 col-xl">

            
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">

                    
                    <h6 className="text-uppercase mb-2" style={{color: "#0099CC"}}>
                      Total Cases
                    </h6>

                    
                <span className = "h2 mb-0" style={{color: "#0099CC"}} >
                     {this.state.object.totalCases}
                    </span>

                    
                    
                  </div>
                  <div className="col-auto">

                    
                    <span className="h2 fe fe-dollar-sign text-muted mb-0">
                    <Chart
                        width={'100px'}
                        height={'100px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={
                          this.titleChartTotalCasesData
                        }
                        options={{
                          hAxis: {
                            title: 'Day',
                          },
                          vAxis: {
                            title: 'Cases',
                          },
                          series: {
                            1: { curveType: 'function' },
                          },
                          colors: ["#33b5e5"]
                        }}
                        rootProps={{ 'data-testid': '1' }}
                      />
                    </span>

                  </div>
                </div> 
              </div>
            </div>

          </div>
          <div className="col-12 col-lg-6 col-xl">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">

                    
                    <h6 className="text-uppercase mb-2" style={{color: '#CC0000'}}>
                      Total Deaths
                    </h6>

                    
          <span className = "h2 mb-0" style = {{color: '#CC0000'}} >
                     {this.state.object.totalDeath}
                    </span>

                    
                    
                  </div>
                  <div className="col-auto">

                    
                    <span className="h2 fe fe-dollar-sign text-muted mb-0">
                    <Chart
                        width={'100px'}
                        height={'100px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={
                          this.titleChartDailyDeathData
                        }
                        options={{
                          hAxis: {
                            title: 'Day',
                          },
                          vAxis: {
                            title: 'Cases',
                          },
                          series: {
                            1: { curveType: 'function' },
                          },
                          colors: ["#ff4444"]
                        }}
                        rootProps={{ 'data-testid': '1' }}
                      />
                    </span>

                  </div>
                </div> 
              </div>
            </div>

          </div>
          <div className="col-12 col-lg-6 col-xl">

            
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">

                    
                    <h6 className="text-uppercase mb-2" style={{color: '#007E33'}}>
                      Total Recovered Cases
                    </h6>

                    
                    <span className="h2 mb-0" style={{color: '#007E33'}}>
                     {this.state.object.totalRecovered}
                    </span>

                    
                    
                  </div>
                  <div className="col-auto">

                    
                    <span className="h2 fe fe-dollar-sign text-muted mb-0">
                    <Chart
                        width={'100px'}
                        height={'100px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={
                          this.titleChartDailyRecoveredData
                        }
                        options={{
                          hAxis: {
                            title: 'Day',
                          },
                          vAxis: {
                            title: 'Cases',
                          },
                          series: {
                            1: { curveType: 'function' },
                          },
                          colors: ["#00C851"]
                        }}
                        rootProps={{ 'data-testid': '1' }}
                      />
                    </span>

                  </div>
                </div> 
              </div>
            </div>

          </div>
          <div className="col-12 col-lg-6 col-xl">

            
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">

                    
                    <h6 className="text-uppercase mb-2" style={{color: '#FF8800'}}>
                      Total Active Cases
                    </h6>

                    
                    <span className="h2 mb-0" style={{color: '#FF8800'}}>
                     {this.state.object.totalActive}
                    </span>

                    
                    
                  </div>
                  <div className="col-auto">

                    
                    <span className="h2 fe fe-dollar-sign text-muted mb-0">
                    <Chart
                        width={'100px'}
                        height={'100px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={
                          this.titleChartDailyActiveData
                        }
                        options={{
                          hAxis: {
                            title: 'Day',
                          },
                          vAxis: {
                            title: 'Cases',
                          },
                          series: {
                            1: { curveType: 'function' },
                          },
                          colors: ["#ffbb33"]
                        }}
                        rootProps={{ 'data-testid': '1' }}
                      />
                    </span>

                  </div>
                </div> 
              </div>
            </div>

          </div>
          
          </MDBRow>
      
      <MDBRow>
      {(this.state.data.stateDistrictData !== null) && 
        <Grid stateDistrictData={this.state.data.stateDistrictData}/>
      }
      
      </MDBRow>
      
          </MDBBox>
                        
      
      

    </MDBBox>);
  }
}
export default Home;