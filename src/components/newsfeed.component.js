import React, {Component} from 'react';
import Constants  from '../constants/app.constants';
import {MDBBox, MDBRow} from 'mdbreact';
import NewsBlock from './newsBlock.component'
class NewsFeed extends Component {
    constants= null;
    articles = [];
    constructor(props) {
        super(props);
        this.constants = new Constants();
        this.state = {
            latestNews: null
        }
    }
    componentWillMount(){
        this.getNews()
    }
    getNews = () => {
       return this.constants.searchNewsByKeyword('').then((res)=> {
            
            this.setState({latestNews: res.articles});
            
            
       });
    }

    componentDidUpdate() {
        console.log(this.state.latestNews);
        
    }
    render(){
        console.log(this.state);
        return ( 
           
      <MDBBox className="container-fluid" style = {{ width: "100%", marginTop: "1%" }}>
                <MDBRow>
                {
                    (this.state.latestNews !== null) &&
                    <NewsBlock news={this.state.latestNews}/>
                }
                    </MDBRow>
      </MDBBox>
      );
    }
}
export default NewsFeed;