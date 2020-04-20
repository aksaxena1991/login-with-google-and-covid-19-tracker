import React from 'react';

import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBView, MDBIcon} from 'mdbreact';
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
import Moment from 'react-moment';
import '../../node_modules/moment';
const newsBlock = (props) => {
    
    const news = props.news;

    return (
        news.map((item,key)=> {
            console.log(item);
return <MDBCol md='4' key={key} onClick={() => {
    window.open(item.url)
}}>
        <MDBCard wide cascade>
            {
                (item.urlToImage !== null || undefined || '') && 
                <MDBView cascade>
                <MDBCardImage
                    hover
                    overlay='white-slight'
                    className='card-img-top'
                    src={item.urlToImage}
                    alt='Card cap'/>
            </MDBView>
            }

            <MDBCardBody cascade className='text-center'>
                <MDBCardTitle className='card-title'>
                    <strong>{item.title}</strong>
                </MDBCardTitle>

                <p className='font-weight-bold blue-text'>{item.content}</p>
{
    (item.description.indexOf('<') > -1) && <MDBCardText>
                    {ReactHtmlParser(item.description)}
                </MDBCardText>
}
                {
    (item.description.indexOf('<') < 0) && <MDBCardText>
                    {(item.description)}
                </MDBCardText>
}
                

                <MDBCol md='12' className='d-flex justify-content-center'>
                <div className='rounded-bottom mdb-color lighten-3 text-center pt-3'>
            <ul className='list-unstyled list-inline font-small'>
              <li className='list-inline-item pr-2 white-text'>
                 <MDBIcon far icon='clock' /> <Moment format="DD/MM/YYYY">{item.publishedAt}</Moment>
                
                
              </li>
              
              
            </ul>
          </div>
                </MDBCol>
            </MDBCardBody>
        </MDBCard>
    </MDBCol>

        })
                    
                    );
}
export default newsBlock;