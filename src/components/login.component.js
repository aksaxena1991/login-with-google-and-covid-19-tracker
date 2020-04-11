import React, {Component} from "react";

import {
    MDBNavLink,
    MDBRow,
    MDBCol,
    MDBCardText,

    MDBIcon,
    MDBAlert,
     MDBInput, MDBBtn, MDBCardImage,MDBCard, MDBCardHeader, MDBCardBody, MDBBox } from 'mdbreact';
import firebaseInstance from '../config/firebase.config';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
        password:'',
        currentIndex: -1,
        errorMessages: [],
        alertType: {
                hide: true,
                color: 'primary',
                message: ''
            },
            
           }
    }

    
    componentDidMount() {
        this.googleSDK();
    }
checkObjectAlreadyExits = (arr, obj) => {
    let index = -1;
       const mark = arr.some(function(item, idx){
        if(JSON.stringify(obj) === JSON.stringify(item)) {
            index = idx;
            return true;
        } else {
            return false;
        }
            // return arr.indexOf(item) != idx
        });
this.setState({currentIndex: index})
        
        return mark
    }
updateInput = (evt) => {
    
        
        if ((evt.target.value === null) || (evt.target.value === '')) {
            const state = this.state;
            if(!this.checkObjectAlreadyExits(this.state.errorMessages,{
                [evt.target.name]:"Please enter your "+evt.target.name + "."
            })) {
                
                state.errorMessages.push({
                [evt.target.name]:"Please enter your "+evt.target.name + "."
            });
            
            }
            this.setState(state);
} else if ((evt.target.value !== '') && (evt.target.value !== null)) {
            const state = this.state;
            state[evt.target.name] = evt.target.value;
            this.setState(state);
} else {
const state = this.state;

            state.errorMessages.splice(this.state.currentIndex, 1);
this.setState(state);
        }

console.log(this.state);
        
    }
appLogin = () => { 
    const dbInst = firebaseInstance.firestore();
if ((this.state.email === null) || (this.state.email === '') || (this.state.password === null) || (this.state.password === '')) {
    return false;
} else {
dbInst
    .collection('users')
    .where('email', '==', this.state.email)
    .where('password', '==', this.state.password)
    .get()
    .then((resp) => {
        if (resp.docs.length > 0) {
            this.setState({
                alertType: {
                    hide: false,
                    color: 'success',
                    message: 'Thank you for login here!'
                }
            });
            setTimeout(() => {
                this
                    .props
                    .history
                    .push('/home');
            }, 1500);
        } else {
            this.setState({
                alertType: {
                    hide: false,
                    color: 'danger',
                    message: 'You are not a registered user.'
                }
            });
            setTimeout(() => {
                this
                    .props
                    .history
                    .push('/sign-up');
            }, 1500);
        }
    });
}

    this.setState({currentIndex: -1});
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
        
        this.auth2.attachClickHandler(this.refs.googleLoginBtn, {}, googleUser => {
                let profile = googleUser.getBasicProfile();
                
                //YOUR CODE HERE
                
                this.props.history.push({
                    pathname : '/home',
                    state:profile
                });
            }, error => {
                
                
            });
    };

    render() {
        return (
            
        <div className="signUpBackground">

            <MDBBox className="container-fluid" tag="div">
            <MDBRow >
            <MDBCol className="col-12 col-lg-6 col-xl" >
                    <MDBCard narrow style={{
                            
                            
                            opacity:0.85,
                            margin: "30% 0% 0% 0%"
                        }}>
                        <MDBCardText tag="h3" className="text-center">
                            Codiv 19 Tracker <strong>Go Corona Go!</strong>
                        </MDBCardText>
                        </MDBCard>
                    </MDBCol>
                <MDBCol className="col-12 col-lg-6 col-xl" >
                    <MDBCard narrow
                            style={{
                            
                            marginTop: "10%",
                            opacity:0.85
                        }}>
                        <MDBCardImage
                                className='view view-cascade gradient-card-header purple-gradient'
                                cascade
                                tag='div'>
                                <MDBCardHeader tag='h4' className='text-left' color="primary-color">
                                <MDBIcon icon="user" size="1x" pull="left" border />
                                Sign In:</MDBCardHeader>
                            </MDBCardImage>
                        <MDBCardBody cascade className='text-center'>
                            <form>
                                <div className="grey-text">
                                    <MDBInput label="Type your email" name='email' group type="email" onChange={(evt) => {this.updateInput(evt)}} validate error="wrong" success="right" />
                                    

                                    <MDBInput label="Type your password" name='password'  onChange={(evt) => {this.updateInput(evt)}} group type="password" validate />
                                </div>
                                <div className="text-center">
                                    <MDBBtn  onClick={() => this.appLogin()}>Login</MDBBtn>
                                    <button type="button" className = "btn btn-danger loginBtn loginBtn--google" ref="googleLoginBtn"  > Login with Google </button>
                                </div>
                                <div className="text-center">
                                    <span style={{display: 'inline-flex'}}>
                                    <MDBNavLink className="black-text" to={'/sign-in'}>Forgot Password?</MDBNavLink> <strong style={{
                                            lineHeight: '2.5rem'
                                    }}> | </strong>
                                    <MDBNavLink className="black-text" to={'/sign-up'}>Sign Up</MDBNavLink>
                                    </span>
                                </div>
                            </form>
                            <hr/>
                                <div className='text-center' hidden={this.state.alertType.hide}>
                                    <MDBAlert
                                        color={this.state.alertType.color}
                                        style={{
                                        width: "25rem !important"
                                    }}>
                                        <strong>{this.state.alertType.message}</strong>
                                    </MDBAlert>
                                </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
       </MDBBox>
            </div>
        );
    }
}