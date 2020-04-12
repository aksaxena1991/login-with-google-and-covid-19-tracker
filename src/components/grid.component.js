import React, {Component} from 'react';
import {MDBBox, MDBRow} from 'mdbreact';
class Grid extends Component {
    constructor(props) {
        super(props);
    }
    collapsable = (evt) => {
        let showClass = evt.target.nextElementSibling.className.indexOf('show');
        if(showClass < 0) {
            evt.target.nextElementSibling.className = evt.target.nextElementSibling.className.replace('hide','').concat(' ','show');
        } else {
            evt.target.nextElementSibling.className = evt.target.nextElementSibling.className.replace('show','').concat(' ','hide');
        }
    }
    render() {
        return (
             <MDBBox className="container-fluid" style = {{ width: "100%", marginTop: "1%" }} >
            <MDBRow tag="div" className="col-12 col-lg-6 col-xl">
            <ul className="list-group">
                <li className="list-group-item btn-default" onClick={(evt) => {
                    this.collapsable(evt);
                }}>
                    Cras justo odio
                
                </li>
                <li className="list-group-item collapse hide" >
                    <ul className="list-group">
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                </li>
                <li className="list-group-item" onClick={(evt) => {
                    this.collapsable(evt);
                }}>Dapibus ac facilisis in</li>
                <li className="list-group-item collapse hide" >
                    <ul className="list-group">
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                </li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            </MDBRow>
            </MDBBox>
                );
}
}
export default Grid;