import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import { connect } from 'react-redux';
import rootUser from "../../actions";
import PropTypes, { instanceOf } from "prop-types";
import {Redirect} from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            username: '',
            dob: '',
            auth: false,
        };
    }

    login() {
        var self = this;
        var apiBaseUrl = "http://swapi.co/api/people/?search=";
        axios.post(apiBaseUrl + self.state.username).then(function(resp) {
            var len = resp.data.results.length;
            for (var i = 0; i < len; i++) {
                if (resp.data.results[i].name === self.state.username &&
                    resp.data.results[i].birth_year === self.state.dob) {
                    const { cookies } = self.props;
                    let d = new Date();
                    d.setTime(d.getTime() + (10*60*1000));
                    cookies.set('name', self.state.username,{path:'/', expires: d} );
                    self.props.rootUser(self.state.username);
                    self.setState({auth: true});
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
        let redirect = <div></div>;
        if(this.state.auth){
            redirect = <Redirect to={{
                pathname: '/home',
            }}/>;
        }
        
        return (
            <div className="container">
                <MuiThemeProvider>
                    <div className="row">
                        {redirect}
                        <div className="col-xs-offset-4 col-xs-4">
                            <TextField
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                onChange = {(event,newValue) => this.setState({username: newValue})}
                            />
                            <br/>
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
    cookies: instanceOf(Cookies).isRequired,
};

export default connect( null, {rootUser})(withCookies(LoginComponent));