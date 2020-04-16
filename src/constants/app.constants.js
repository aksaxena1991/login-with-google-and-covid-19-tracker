import axios from 'axios';

class Constants {
    apiConstants = {
        
        latLngViaPlaceNameAPI:'https://api.opencagedata.com/geocode/v1/json?key=8bbf8abe1b914040acce5bf04a7dcfb9&pretty=1&q=',
        geoLocationViaIPAPI : "https://geoip-db.com/json/"
    }
    constructor(){}
    geoLocationByIP = () => {
        return axios.get(this.apiConstants.geoLocationViaIPAPI).then((res)=>{
            return res.data;
        });
        
    }

    getLatLngViaPlaceName = (place) =>{
        
        return axios.get(this.apiConstants.latLngViaPlaceNameAPI+place).then((res)=>{
            return res.data;
        });
    }

}
export default Constants;