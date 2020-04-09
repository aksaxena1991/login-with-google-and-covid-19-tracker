
import React, { Component} from 'react';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import L from 'leaflet';
class WorldMap extends Component {
  constructor(props)
  {
    super(props);
    this.state= {
      mapObj: {
        container:'map',
        zoom:4,
        style: 'mapbox://styles/mapbox/satellite-v9',
        lat:10,
        lng:10,
        
      },
      elementId:'marker'
    };
    this.map = null;
    this.el = document.createElement('div');
    this.el.id = this.state.elementId;
    this.popup = null;
    this.geolocator();
    console.log(L.marker);
  }
  geolocator = () => {
    try {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=> {
          let mapObj = this.state.mapObj
          mapObj.lat = position.coords.latitude;
          mapObj.lng =  position.coords.longitude;
          this.setState({mapObj});
        });
      }
      
    }
    catch(e){
      console.log(e);
    } 
  }
  componentDidMount(){
    
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWtzYXhlbmExOTkxIiwiYSI6ImNrOHN4Ym4yMTAzazQzbXBzYmN4dDd0bDYifQ.BkmoT7nAymLlzw59ZshdEg';
  this.map = new mapboxgl.Map({
  container : this.state.mapObj.container,
style : 'mapbox://styles/mapbox/streets-v9',
  center : [ this.state.mapObj.lat, this.state.mapObj.lng ],
  zoom : this.state.mapObj.zoom
    });
  this.map.addControl(new mapboxgl.NavigationControl());

  this.popup = new mapboxgl.Popup({  center : [ this.state.mapObj.lat, this.state.mapObj.lng ] }).setText(
    'India'
    );
    // L.marker([ this.state.mapObj.lat, this.state.mapObj.lng ]).addTo(this.map);
    new mapboxgl.Marker(this.el).setLngLat([ this.state.mapObj.lat, this.state.mapObj.lng ]).setPopup(this.popup).addTo(this.map);
  }

  render(){
    

    return(
      <div id="map" style={{ height: '100vh', background: 'grey' }} ></div>
      );
  }
}
export default WorldMap;