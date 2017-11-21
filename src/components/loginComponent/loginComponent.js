import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {apiCall} from "../../helper";
import { connect } from 'react-redux';
import rootUser from "../../actions";
import PropTypes from "prop-types";

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            username: '',
            dob: '',
            error: '',
        };
    }

    login() {
        var self = this;
        var apiBaseUrl = "https://swapi.co/api/people/?search=";
        apiCall(apiBaseUrl + self.state.username).then(function(resp) {
            var len = resp.data.results.length;
            for (var i = 0; i < len; i++) {
                if (resp.data.results[i].name === self.state.username &&
                    resp.data.results[i].birth_year === self.state.dob) {
                    self.props.rootUser(self.state.username);
                    self.props.history.push('/home');
                    break;
                }else if(resp.data.results[i].name === self.state.username &&
                    resp.data.results[i].birth_year !== self.state.dob){
                    self.setState({error: "DOB does not match"});
                    setTimeout(function() { self.setState({error: ""}); }, 3000);
                    break;
                }
            }
            if (i === len) {
                self.setState({error: "Username does not exist"});
                setTimeout(function() { self.setState({error: ""}); }, 3000);
            }
        }).catch(function(error) {
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
};

export default connect( null, {rootUser})(LoginComponent);