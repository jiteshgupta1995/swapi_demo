import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {apiCall} from "../../helper/NetworkRequest";
import { connect } from 'react-redux';
import addUser from "../../actions/user";
import PropTypes from "prop-types";

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.timeoutCallback = this.timeoutCallback.bind(this);
        this.apiCallback = this.apiCallback.bind(this);
        this.state = {
            username: '',
            dob: '',
            error: '',
        };
    }

    timeoutCallback(){
        this.setState({error: ""});
        return;
    }

    apiCallback(resp){
        var len = resp.data.results.length;
        for (var i = 0; i < len; i++) {
            if (resp.data.results[i].name === this.state.username &&
                resp.data.results[i].birth_year === this.state.dob) {
                this.props.addUser(this.state.username);
                this.props.history.push('/home');
                break;
            }else if(resp.data.results[i].name === this.state.username &&
                resp.data.results[i].birth_year !== this.state.dob){
                this.setState({error: "DOB does not match"});
                setTimeout(this.timeoutCallback(), 3000);
                break;
            }
        }
        if (i === len) {
            this.setState({error: "Username does not exist"});
            setTimeout(this.timeoutCallback(), 3000);
        }
        return;
    }

    login() {
        // var self = this;
        var apiBaseUrl = "https://swapi.co/api/people/?search=";
        apiCall(apiBaseUrl + this.state.username).then((resp) => this.apiCallback(resp))
            .catch(function(error) {
                console.error(error);
            });
    }

    onChangeHandler(event, newValue){
        this.setState({[event.target.id]: newValue});
    }

    render() {
        return (
            <div className="container">
                <MuiThemeProvider>
                    <div className="row">
                        <div className="col-xs-offset-4 col-xs-4">
                            <TextField
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                id="username"
                                onChange = {(event,newValue) => this.onChangeHandler(event,newValue)}
                            />
                            <br />
                            <TextField
                                hintText="Enter your DOB"
                                floatingLabelText="Date of Birth"
                                id="dob"
                                onChange = {(event,newValue) => this.onChangeHandler(event, newValue)}
                            />
                            <br /><br />
                            <RaisedButton label="Login" primary={true}
                                id="loginButton"
                                onClick={() => this.login()}/>
                            <br />
                            {this.state.error}
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

LoginComponent.propTypes = {
    history: PropTypes.object.isRequired,
    addUser: PropTypes.func,
};

export default connect( null, {addUser})(LoginComponent);