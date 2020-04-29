import axios from 'axios';
import Constants from './app.constants';


class Middleware {
    constant = null;
    
    constructor() {
        this.constant = new Constants();
        
    }
    stateWithItsDistricts =  () => {
         this.constant.allIndiaStateData().then((res1) => {
            let arr = [];
            res1.map((val1,key1)=> {
              return   this.constant.stateDistrictData(val1.code).then((res2)=> {
                return arr.push({
                        district:res2,
                        active : val1.active,
                        code : val1.code,
                        confirmed : val1.confirmed,
                        deaths : val1.deaths,
                        lastupdatedtime : val1.lastupdatedtime,
                        name : val1.name,
                        newconfirmed : val1.newconfirmed,
                        newdeaths : val1.newdeaths,
                        newrecovered : val1.newrecovered,
                        recovered : val1.recovered
                    });
                    
                });
                    
        });
        
    });
        

    }
    APIResponseMiddleware =  () => {
        
        this.constant.allIndiaStateData().then((res1) => {
            
            if(Array.isArray(res1)) {
                
                res1.map((val1,key1)=> {
                   let combine = [];
                   this.constant.stateDistrictData(val1.code).then((res2)=> {
                       return combine.push({district:res2.results});
                    });
                    // this.constant.getLatLngViaPlaceName(val1.name).then((res3) => {
                    //     res3.results.filter((fill)=> {
                    //             if ((fill.formatted.indexOf('India') > -1) &&(fill.components.state_code === val1.code) && (fill.components.state === val1.name)) {
                    //                 this.combine.push({geometry: {lat: fill.geometry.lat, lng: fill.geometry.lng}})
                    //             }
                    //         });
                    // });
                     
                });
               
            }
            
            
            // return res1;
        });
    }
}
export default Middleware;