import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";
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
        };
    }

    login() {
        var self = this;
        var apiBaseUrl = "https://swapi.co/api/people/?search=";
        axios.get(apiBaseUrl + self.state.username).then(function(resp) {
            var len = resp.data.results.length;
            for (var i = 0; i < len; i++) {
                if (resp.data.results[i].name === self.state.username &&
                    resp.data.results[i].birth_year === self.state.dob) {
                    self.props.rootUser(self.state.username);
                    self.props.history.push('/home');
                    break;
                }
            }
            if (i === len) {
                alert("Username or DOB is invalid");
            }
        }).catch(function(error) {
            console.error(error);
        });
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
                                onChange = {(event,newValue) => this.setState({username: newValue})}
                            />
                            <br />
                            <TextField
                                hintText="Enter your DOB"
                                floatingLabelText="Date of Birth"
                                onChange = {(event,newValue) => this.setState({dob: newValue})}
                            />
                            <br /><br />
                            <RaisedButton label="Login" primary={true}
                                onClick={() => this.login()}/>
                            <br />
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

LoginComponent.propTypes = {
    addUser: PropTypes.func,
    history: PropTypes.object.isRequired,
};

export default connect( null, {rootUser})(LoginComponent);