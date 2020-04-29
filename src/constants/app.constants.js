import axios from 'axios';

class Constants {
    apiConstants = {
        
        latLngViaPlaceNameAPI:'https://api.opencagedata.com/geocode/v1/json?key=8bbf8abe1b914040acce5bf04a7dcfb9&pretty=1&q=',
        geoLocationViaIPAPI : "https://geoip-db.com/json/",
        news: {
            newsapikey: 'bb3f6bfb660244bcac69d754062c2788',
            newsURL: 'https://newsapi.org/v2/everything?sortBy=publishedAt&pageSize=100&apiKey='
        }
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
    searchNewsByKeyword = (keyword) => {
        (keyword === '' || null || undefined) ? keyword= 'India Covid-19': keyword = keyword
        return axios.get(this.apiConstants.news.newsURL + this.apiConstants.news.newsapikey + '&q='+keyword).then((res) => {
            return res.data;
        });
    }
    allIndiaStateData = () => {
        return axios({
            "method":"GET",
            "url":"https://covid-19-india-data-by-zt.p.rapidapi.com/GetIndiaStateWiseData",
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"covid-19-india-data-by-zt.p.rapidapi.com",
                "x-rapidapi-key":"4afa9d804fmshb82f26d7850288fp1fe303jsn995d5ec4f72c"
            }
            })
            .then((response)=>{
            return response.data.data;
            })
            .catch((error)=>{
            console.log(error)
            })
    }
    stateDistrictData = (stateCode) => {
        return axios({
            "method":"GET",
            "url":"https://covid-19-india-data-by-zt.p.rapidapi.com/GetIndiaDistrictWiseDataForState",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"covid-19-india-data-by-zt.p.rapidapi.com",
            "x-rapidapi-key":"4afa9d804fmshb82f26d7850288fp1fe303jsn995d5ec4f72c"
            },"params":{
            "statecode":stateCode
            }
        })
        .then((response)=>{
        return response.data.data
        })
        .catch((error)=>{
        console.log(error)
        })
    }

}
export default Constants;