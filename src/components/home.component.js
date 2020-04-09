import React, {Component} from 'react';
import axios from 'axios';
import Chart from "react-google-charts";
import CustomNavbar from "./navbar.component";
import { MDBBox, MDBRow } from 'mdbreact';
import WorldNews from './worldNews.component';

export default class Home extends Component {
  object = {
    totalCases:0,
    totalActive:0,
    totalDeath:0,
    totalRecovered:0,
    color:{
      deathColor:'#CC0000',
      activeColor:'#FF8800',
      recoveredColor:'#007E33',
      totalColor:'#0099CC'
    }
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
  state = {
    currentLocation: {
    lat : 10,
    lng : 10,
    },
    markerPopup:{
      state:"",
      active : 0,
      confirmed : 0,
      deaths : 0,
      deltaconfirmed : 0,
      deltadeaths : 0,
      deltarecovered : 0,
      lastupdatedtime : 0,
      recovered : 0,
      statecode : ""
    },
    zoom: 5,
    
    collapseID: "collapse1",
    stateApiResponse:[],
    districtApiResponse:[],
    completeInfo:[]
  }
  
  stateLatLong =  null;
  constructor(props){
    super(props);
    this.stateLatLong = [];
  }
  geoCoder = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let location = {lat:position.coords.latitude,
        lng: position.coords.longitude}
      this.setState({currentLocation:location});
    })
  };
componentDidUpdate(prevProps, prevState){
this.rowClickHandler = this.rowClickHandler.bind(this);
}


  componentDidMount() {
    
    console.log(this.state);
    axios.get(`https://api.covid19india.org/state_district_wise.json`).then(res1 => {
      this.setState({districtApiResponse:res1.data});
      
      axios.get(`https://api.covid19india.org/data.json`).then(res2 => {
        
        
        this.setState({stateApiResponse: res2.data});
        this.tileChartData(res2.data);
        Object.entries(res1.data).forEach(([k1,v1]) => {
          
          Object.entries(res2.data.statewise).forEach(([k2,v2]) => {
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
                "text": k1
              }
            }).then((res3) => {
              if ((k1 === res3.data.features[0]['properties'].state) && (v2.state === res3.data.features[0]['properties'].state)) {
                
                this.stateLatLong.push({
                  lat:res3.data.features[0]['properties'].lat,
                  lng : res3.data.features[0]['properties'].lon,
                  state:k1,
                  active:v2.active,
                  confirmed : v2.confirmed,
                  deaths : v2.deaths,
                  deltaconfirmed : v2.deltaconfirmed,
                  deltadeaths : v2.deltadeaths,
                  deltarecovered : v2.deltarecovered,
                  lastupdatedtime : v2.lastupdatedtime,
                  recovered : v2.recovered,
                  statecode : v2.statecode
                });
                let stateLatLong = this.stateLatLong;
                this.setState({completeInfo:stateLatLong});
                
              }
            });
          });
        });
      });
      

      });

      
  }
  rowClickHandler(key,value) {
    console.log(key,value,this.state);
    let location = {
      lat: value.lat,
      lng: value.lng
    }
    let makerPopup = {
      state : value.state,
      active : value.active,
      confirmed : value.confirmed,
      deaths : value.deaths,
      deltaconfirmed : value.deltaconfirmed,
      deltadeaths : value.deltadeaths,
      deltarecovered : value.deltarecovered,
      lastupdatedtime : value.lastupdatedtime,
      recovered : value.recovered,
      statecode : value.statecode
    };
    this.setState({markerPopup: makerPopup});
    this.setState({currentLocation: location});
  }

tileChartData(res){


 res.cases_time_series.map((item,key)=> {
   this.object.totalCases = +parseInt(item.totalconfirmed);
   this.object.totalActive = +(parseInt(item.totalconfirmed) - parseInt(item.totalrecovered) - parseInt(item.totaldeceased));
this.object.totalDeath = +parseInt(item.totaldeceased);
   this.object.totalRecovered = +parseInt(item.totalrecovered);
this.titleChartTotalCasesData.push([key, parseInt(item.totalconfirmed)]);
this.titleChartDailyDeathData.push([key,parseInt(item.totaldeceased)])
this.titleChartDailyRecoveredData.push([key,parseInt(item.totalrecovered)])
this.titleChartDailyActiveData.push([key, (parseInt(item.totalconfirmed) - parseInt(item.totalrecovered) - parseInt(item.totaldeceased))])
});
console.log(this.state.stateApiResponse);


}

  render() {
  this.geoCoder();

  const tableRows = this.state.completeInfo.map((val,index) => {
return ( <tr key={index} onClick={() => this.rowClickHandler(index, val)}>
          <td>{index+1}</td>
          <td>{val.state}</td>
          <td> { val.confirmed }</td>
          <td>{val.active}</td>
          <td>{val.deaths}</td>
          <td>{val.recovered}</td>
        </tr>);
  })


    return (
      <MDBBox  tag="div">
      <CustomNavbar/>
      
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

                    
< span className = "h2 mb-0" style={{color: "#0099CC"}} >
                     {this.object.totalCases}
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

                    
< span className = "h2 mb-0" style = {{color: '#CC0000'}} >
                     {this.object.totalDeath}
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
                     {this.object.totalRecovered}
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
                     {this.object.totalActive}
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
</MDBBox>
<MDBBox>
<WorldNews/>
</MDBBox>
    
        
    </MDBBox >
    );
  }
}