import axios from 'axios';

class Constants {
    constructor(){}
    geoLocationByIP = () => {
        return axios.get("https://geoip-db.com/json/").then((res)=>{
            return res.data;
        });
        
    }

}
export default Constants;