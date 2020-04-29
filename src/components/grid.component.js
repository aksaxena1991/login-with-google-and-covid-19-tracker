import React, {Component} from 'react';
import {MDBBox, MDBRow} from 'mdbreact';
import MiniMap from './minimap.component';
import Graph from './graph.component';
const expendable = (evt) => {
     let showClass = evt.target.nextElementSibling.className.indexOf('show');
    if(showClass < 0) {
        evt.target.nextElementSibling.className = evt.target.nextElementSibling.className.replace('hide','').concat(' ','show');
        evt.target.className = evt.target.className.concat(' ','btn-default');
    } else {
        evt.target.nextElementSibling.className = evt.target.nextElementSibling.className.replace('show','').concat(' ','hide');
        evt.target.className = evt.target.className.replace('btn-default','');
    }
}

function ListItems(props) { 
    
    if(props.gridData === undefined || props.gridData === null || !Array.isArray(props.gridData)) {
      return null;
    }
    return props.gridData.map((val,key)=> 
                <div key={"_greatgrandparent"+key}>
                    <div className="list-group-item " key={"grandparent_sibling"+key} onClick={(evt) => {
                       expendable(evt);
                       props.triggerEvent(val)
                        }} >
                            {val.state}
                        
                    </div>
                    <div className="list-group-item collapse hide" key={"_grandparent"+key}>
                            <h4>Districts</h4>
                            <div className="list-group" key={"_parent"+key}>
                            {
                                
                                val.districts.map((val2,key2)=>{
                                   return <div key={"parent_child"+key2}>
                                   <div className="list-group-item" key={"_child"+key2} onClick={(evt) => {
                                       expendable(evt)
                                   }}>{val2.district}</div>
                                   <div className="list-group-item collapse hide" key={"sibling_child"+key2}>
                                    <table className="table table-striped table-dark table-hover">
                                        <thead>
                                            <tr>
                                                <th>Confirmed</th>
                                                <th>Newly Confirmed</th>
                                                <th>Last Updated</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{val2.data.confirmed}</td>
                                                <td>New <span className="badge badge-danger">0</span></td>
                                                <td>{val2.data.lastupdatedtime}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                   </div>
                                   </div>
                                })
                            }
                           
                            </div>
                    </div>
                </div>
            )

    
}
class Grid extends Component {
singleStateData = null;
    constructor(props) {
        super(props);
        this.counter = 0;
        
        this.state = {
            gridData: [],
            singleStateData:null
            
        };
        
        
    }
    componentDidUpdate(props){
        
        if(props.stateDistrictData !== null & props.stateDistrictData !== undefined) {
            this.counter++;
            if(this.counter == 1) {
                this.arrayFromObject(props.stateDistrictData);
            }
        }
    }
    
    arrayFromObject = (obj) => {
    const objectArray = [];    
        Object.entries(obj).map((item1, index1)=>{
            const stateName = item1[0];
            Object.entries(item1[1]).map((item2, index2)=>{
                let districtArr = [];
                Object.entries(item2[1]).map((item3,index3)=> {
                    const districtName = item3[0];
                    const dataArr = {};
                    Object.entries(item3[1]).map((item4,index4)=>{
                        dataArr[[item4[0]]] = item4[1]
                    });
                    districtArr.push({
                        district:districtName,
                        data:dataArr
                    });
                });
                objectArray.push({
                    state:stateName,
                    districts:districtArr
                })
            });
           this.setState({
               gridData: objectArray
           });
        });

            
        
        


    }
    customEventListener = (val) => {
    this.singleStateData = val;
    this.setState({singleStateData:this.singleStateData});
    };
    
    
    render() {
        return (
           
                <MDBRow tag="div" style={{  marginTop: "0.5%" }}>
                    <div className = "col-12 col-lg-4 scrollbar" style = {{overflowY: 'scroll', height:'40rem'}}id = "style-2" >
                        <h4>Corona (Covid-19) Impacted Union Territories & Provinces of India</h4>
                        <ListItems gridData={this.state.gridData} triggerEvent={this.customEventListener}/>
                    </div>
                    <div className="col-12 col-lg-4">
                        <h4>Corona (Covid-19) Impacted Districts according to their province name</h4>
                        <MiniMap mapData={this.state.gridData} singleStateData={this.state.singleStateData}/>
                    </div>
                    <div className="col-12 col-lg-4">
                        <h4>Visualization of Corona (Covid-19) Impacted Districts according to their province name</h4>
                        <Graph/>
                    </div>
                </MDBRow>
            
                );
}
}
export default Grid;