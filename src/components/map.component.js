import GoogleMapReact from 'google-map-react';
import React, { useState} from 'react';
import { MDBBox } from 'mdbreact';
const Marker = (props) => {
    const {color, name, id} = props;
    return (
    <MDBBox tag="div" className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}></MDBBox>
    );
};
const WorldMap = (props) => {

    
    let center = props.currentLocation;
    let markerPopup = props.markerPopup;
    const [zoom] = useState(11);
    
    return (
    <MDBBox tag="div" style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys = {{ 
                language : 'en',
                region : 'en',
key : 'AIzaSyA6LLUl9_aP6aIDOAnypFpyC3FK6wxmSHg'
                }
}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={center.lat}
            lng={center.lng}
            name='marker'
            color='orange'
          />
        </GoogleMapReact>
      </MDBBox>
    );
}
export default WorldMap;

