import React, {Component} from "react";
import { MDBContainer,MDBBox, MDBRow, MDBCol,
     MDBInput, MDBBtn, MDBCardImage,MDBCard, MDBCardHeader, MDBCardBody } from 'mdbreact';
export default class Login extends Component {

    constructor(props) {
super(props);
this.state = {
        isLoggedIn: false, isLoading: false
    }
    }

    componentDidMount() {
        this.googleSDK();
    }
    googleSDK() {
        window["googleSDKLoaded"] = () => {
            window["gapi"].load("auth2", () => {

                this.auth2 = window["gapi"]
                    .auth2
                    .init({client_id: "529518720261-7dh9ki1mnk675o638710b1rigvo9cijf.apps.googleusercontent.com", cookiepolicy: "single_host_origin", scope: "profile email"});
                this.prepareLoginButton();
            });
        };

        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            console.log(d, s, id);
            js.id = id;
            js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
            fjs
                .parentNode
                .insertBefore(js, fjs);
        })(document, "script", "google-jssdk");

    }
    prepareLoginButton = () => {
        console.log(this);
        this
            .auth2
            .attachClickHandler(this.refs.googleLoginBtn, {}, googleUser => {
                let profile = googleUser.getBasicProfile();
                console.log("Token || " + googleUser.getAuthResponse().id_token);
                console.log("ID: " + profile.getId());
                console.log("Name: " + profile.getName());
                console.log("Image URL: " + profile.getImageUrl());
                console.log("Email: " + profile.getEmail());
                //YOUR CODE HERE
                this.setState({isLoggedIn: true});
                this.props.history.push('/home');
            }, error => {
                this.setState({isLoggedIn: false});
                console.log(JSON.stringify(error, undefined, 2));
            });
    };

    render() {
        return (
        <MDBContainer>
            <MDBRow>
                <MDBCol col='12' className="offset-md-4">
                    <MDBCard narrow style={{ width: "25rem", marginTop: "10%" }}>
                        <MDBCardImage className='view view-cascade gradient-card-header purple-gradient' cascade tag='div'>
                            <MDBCardHeader tag='h4' className='text-center' color="primary-color">Sign In</MDBCardHeader>
                        </MDBCardImage>
                        <MDBCardBody cascade className='text-center'>
                            <form>
                                <div className="grey-text">
                                    <MDBInput label="Type your email"  group type="email" validate error="wrong" success="right" />
                                    <MDBInput label="Type your password"  group type="password" validate />
                                </div>
                                <div className="text-center">
                                    <MDBBtn >Login</MDBBtn>
                                    <button type="button" className = "btn btn-danger loginBtn loginBtn--google" ref="googleLoginBtn"  > Login with Google </button>
                                </div>
                                <div className="text-center">
                                    <MDBBox tag='p'>Forgot Password?</MDBBox>
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