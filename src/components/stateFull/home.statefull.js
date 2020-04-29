import React, {Component} from 'react';
import WorldMap from './worldmap.statefull';
import {MDBBox, MDBRow} from 'mdbreact';
import Middleware from '../../constants/middleware.constants';

class Home extends Component {
    middleware = null;
    constructor(props){
        super(props);
        this.middleware = new Middleware();
        console.log(this.middleware.stateWithItsDistricts());
    }
    render() {
        return(
            <MDBBox className="container-fluid" style = {{ width: "100%", marginTop: "1%" }}>
                <MDBRow tag="div"></MDBRow>
                <WorldMap/>
            </MDBBox>
            );
    }
}
export default Home;