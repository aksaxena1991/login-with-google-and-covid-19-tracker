import React, {Component} from "react";
import {
    MDBCardText,
    MDBIcon,
    MDBBox,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBNavLink,
    MDBAlert,
    MDBCardImage,
    MDBCard,
    MDBCardHeader,
    MDBCardBody
} from 'mdbreact';

import firebaseInstance from '../config/firebase.config';
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            alertType: {
                hide: true,
                color: 'primary',
                message: ''
            }

        }
    }
    register = () => {
        const dbInst = firebaseInstance.firestore();

        dbInst
            .collection('users')
            .add({firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email, password: this.state.password})
            .then(resp => {
                try {
                    if (resp.id !== undefined) {
                        this.setState({
                            alertType: {
                                hide: false,
                                color: 'success',
                                message: 'Thank you for registering with us!'
                            }
                        });
                        setTimeout(() => {
                            this.setState({
                                firstname: "",
                                lastname: "",
                                email: "",
                                password: "",
                                alertType: {
                                    hide: true,
                                    color: 'primary',
                                    message: ''
                                }
                            });
                            this
                                .props
                                .history
                                .push('/sign-in');
                        }, 1500);

                    };

                } catch (e) {
                    this.setState({
                        alertType: {
                            hide: false,
                            color: 'danger',
                            message: e.toString()
                        }
                    });
                    setTimeout(() => {
                        this.setState({
                            firstname: "",
                            lastname: "",
                            email: "",
                            password: "",
                            alertType: {
                                hide: true,
                                color: 'primary',
                                message: ''
                            }
                        });
                    }, 1500);
                }
            })

    };
    componentDidUpdate(prevprops, prevstate) {
        console.log(prevprops, prevstate, this.state);
    }
    render() {
        return (
            <div className="signUpBackground">
             <MDBBox className="container-fluid" tag="div">
                <MDBRow>
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
                    <MDBCol className="col-12 col-lg-6 col-xl">
                        <MDBCard
                            narrow
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
                                Sign Up:</MDBCardHeader>
                            </MDBCardImage>
                            <MDBCardBody cascade className='text-center'>
                                <form>
                                    <div className="grey-text">
                                        <MDBInput
                                            label="First Name"
                                            onChange={evt => this.setState({firstname: evt.target.value})}
                                            group
                                            error="wrong"
                                            success="right"/>
                                        <MDBInput
                                            label="Last Name"
                                            onChange={evt => this.setState({lastname: evt.target.value})}
                                            group
                                            error="wrong"
                                            success="right"/>
                                        <MDBInput
                                            label="Type your email"
                                            onChange={evt => this.setState({email: evt.target.value})}
                                            group
                                            type="email"
                                            validate
                                            error="wrong"
                                            success="right"/>
                                        <MDBInput
                                            label="Type your password"
                                            onChange={evt => this.setState({password: evt.target.value})}
                                            group
                                            type="password"
                                            validate/>
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn onClick={() => this.register()}>Sign Up</MDBBtn>

                                    </div>

                                    <div className="text-center">
                                        <MDBNavLink className="black-text" to={'/sign-in'}>Already Registered Sign In?</MDBNavLink>

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