import React, {Component} from 'react';
import {MDBBox, MDBRow} from 'mdbreact';

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
                        }}>
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
                                                <td>New <span class="badge badge-danger">{val2.data.delta.confirmed}</span></td>
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
    
    constructor(props) {
        super(props);
        this.counter = 0;
        this.state = {
            gridData: [],
            
        };
        
        
    }
    componentWillReceiveProps(props){
        

        
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
    
    render() {
        
        // console.log(this.state);
        return (
            <MDBBox className="container-fluid" style = {{ width: "100%", marginTop: "1%" }}>
            <MDBRow tag="div" className="col-12 col-lg-6 col-xl">
            <div className="list-group">
                <ListItems gridData={this.state.gridData}/>
            </div>
            </MDBRow>
            </MDBBox>
                );
}
}
export default Grid;