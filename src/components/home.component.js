import React from 'react';

import axios from 'axios';

export default class Home extends React.Component {
    state = {
        stateDistrictWise:[]
    }

    componentDidMount(){
        axios.get(`https://api.covid19india.org/state_district_wise.json`)
      .then(res => {
        const stateDistrictWise = res.data;
        this.setState({ stateDistrictWise });
        console.log(this.state);
      })
    }
    render() {
        return(<b>Anubhav</b>);
    }
}