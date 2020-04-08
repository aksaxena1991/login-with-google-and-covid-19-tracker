import React, {Component} from 'react';
// import L from 'leaflet';
import WorldMap from './map.component';
// import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import axios from 'axios';
import CustomNavbar from "./navbar.component";
import { MDBBox, MDBRow, MDBCol, MDBTable,
  MDBTableBody,MDBTableHead,
      MDBCardImage,MDBCard, MDBCardHeader, MDBCardBody } from 'mdbreact';


// var myIcon = L.icon({
//   iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa' +
//       '1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85Ncypg' +
//       'SFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKL' +
//       'IsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8' +
//       'OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPq' +
//       'F55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uy' +
//       'h6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXr' +
//       'z8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBq' +
//       'tKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHt' +
//       'Ls5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+H' +
//       'Ea73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54' +
//       'mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ez' +
//       'NFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eE' +
//       'iU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZ' +
//       'eK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr' +
//       '6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1b' +
//       'lQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji' +
//       '0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEv' +
//       'KkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83' +
//       'yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXW' +
//       'fh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s' +
//       '0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkb' +
//       'uPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T' +
//       '9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BW' +
//       'm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
//   iconSize: [
//     25, 41
//   ],
//   iconAnchor: [
//     12.5, 41
//   ],
//   popupAnchor: [0, -41]
// });
export default class Home extends Component {

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
      <div>
      <CustomNavbar/>
      
<MDBBox className="container-fluid" style = {{ width: "100%", marginTop: "1%" }} >
<MDBRow>
        <MDBCol md="6">
              <MDBCard narrow>
                <MDBCardImage className='view view-cascade gradient-card-header purple-gradient' cascade tag='div'>
                    <MDBCardHeader tag='h4' className='text-center'>Statistics of India of Covid 19</MDBCardHeader>
                </MDBCardImage>
                <MDBCardBody cascade className='text-center'>
                <div className="table-responsive">
                  <MDBTable className="table" >
                    <MDBTableHead>
                      <tr>
                        <th>#</th>
                        <th>State/UT</th>
                        <th>Confirmed Cases</th>
                        <th>Active Cases</th>
                        <th>Recovered Cases</th>
                        <th>Deceased Cases</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                    {
                      tableRows
                    }
                    </MDBTableBody>
                  </MDBTable>
                </div>
                  </MDBCardBody>
              </MDBCard>  
        </MDBCol>
        <MDBCol md="6">
          <MDBRow>
              <MDBBox tag="div" className="col-sm">
              <WorldMap currentLocation={this.state.currentLocation} markerPopup={this.state.markerPopup}/>
              
              </MDBBox>
          </MDBRow>
        </MDBCol>
    </MDBRow>
        </MDBBox> 
        
    </div>
    );
  }
}