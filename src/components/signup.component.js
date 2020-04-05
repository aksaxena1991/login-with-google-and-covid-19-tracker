import React, {Component} from "react";
import { MDBContainer,MDBBox, MDBRow, MDBCol,
     MDBInput, MDBBtn, MDBCardImage,MDBCard, MDBCardHeader, MDBCardBody } from 'mdbreact';
export default class SignUp extends Component {
    render() {
        return (
        <MDBContainer>
            <MDBRow>
                <MDBCol col='12' className="offset-md-4">
                    <MDBCard narrow style={{ width: "25rem", marginTop: "10%" }}>
                        <MDBCardImage className='view view-cascade gradient-card-header purple-gradient' cascade tag='div'>
                            <MDBCardHeader tag='h4' className='text-center' color="primary-color">Sign Up</MDBCardHeader>
                        </MDBCardImage>
                        <MDBCardBody cascade className='text-center'>
                            <form>
                                <div className="grey-text">
                                    <MDBInput label="First Name" group error="wrong" success="right" />
                                    <MDBInput label="Last Name" group error="wrong" success="right"/>
                                    <MDBInput label="Type your email"  group type="email" validate error="wrong" success="right" />
                                    <MDBInput label="Type your password"  group type="password" validate />
                                </div>
                                <div className="text-center">
                                    <MDBBtn >Sign Up</MDBBtn>
                                    
                                </div>
                                <div className="text-center">
                                    <MDBBox tag='p'>Already Registered Sign In?</MDBBox>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
            
        );
    }
}