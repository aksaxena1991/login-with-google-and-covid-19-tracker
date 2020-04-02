import React, {Component} from "react";

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
        console.log(this.refs.googleLoginBtn);
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
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
< button className = "btn btn-success btn-block loginBtn loginBtn--google" ref = "googleLoginBtn" onClick = {this.clickMe } > Login with Google </button>
                
                <p className="forgot-password text-right">
                    Forgot
                    <b >password?</b>
                </p>
            </form>
        );
    }
}