import React, {Component} from 'react';

import Chart from "react-google-charts";
import CustomNavbar from "./navbar.component";
import { MDBBox, MDBRow } from 'mdbreact';
import WorldNews from './worldNews.component';

class Home extends Component {
  
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
  constructor(props){
    super(props);
  }
  
  
  componentDidUpdate(){
  
  }
  render(){
    return(
    <MDBBox tag="div">
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

                    
                <span className = "h2 mb-0" style={{color: "#0099CC"}} >
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

      <WorldNews/>
      

    </MDBBox>);
  }
}
export default Home;