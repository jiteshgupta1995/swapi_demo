import React, { Component } from 'react';
import { apiCall } from "../../helper/NetworkRequest";
import { connect } from 'react-redux';
import addUser from "../../actions/user";
import PropTypes from "prop-types";

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.apiSuccessCallback = this.apiSuccessCallback.bind(this);
        this.apiFailureCallback = this.apiFailureCallback.bind(this);
        this.state = {
            username: '',
            dob: '',
            error: '',
            loader: false,
        };
    }

    login(event) {
        event.preventDefault();
        this.setState({loader: true});
        var apiBaseUrl = "https://swapi.co/api/people/?search=";
        apiCall(apiBaseUrl + this.state.username)
            .then((resp) => this.apiSuccessCallback(resp))
            .catch((error) => this.apiFailureCallback(error));
    }

    apiSuccessCallback(resp) {
        var len = resp.data.results.length;
        let errorMsg = "Username does not exist";
        for (var i = 0; i < len; i++) {
            if (resp.data.results[i].name === this.state.username) {
                if (resp.data.results[i].birth_year === this.state.dob) {
                    errorMsg = "";
                    this.props.addUser(this.state.username);
                    this.props.history.push('/home');
                    return;
                } else {
                    errorMsg = "DOB does not match";
                }
                break;
            }
        }
        this.setState({ error: errorMsg, loader: false });
    }

    apiFailureCallback(error) {
        this.setState({ error: "Error", loader: false });
        console.error(error.response.status);
    }

    onChangeHandler(event) {
        this.setState({[event.target.id]: event.target.value });
    }

    render() {
        let loader = <div></div>;
        if(this.state.loader){
            loader = <div className="loader"></div>
        }
        return (
            <div className="container">
                <div className="row center yellow">
                    <h1 className="jumbo">SWAPI</h1>
                    <p className="lead">The Star Wars API</p>
                </div>
                <div className="row">
                    <div className="col-xs-offset-4 col-xs-4 form-box">
                        <form onSubmit={this.login}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    id="username"
                                    className="form-control"
                                    placeholder="Enter your Username"
                                    onChange = {this.onChangeHandler}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input
                                    id="dob"
                                    className="form-control"
                                    placeholder="Enter your DOB"
                                    onChange = {this.onChangeHandler}
                                    required
                                />
                            </div>
                            <button
                                id="loginButton"
                                className="btn btn-primary btn-block"
                                type="submit"
                            >
                            LOGIN
                            </button>
                            <br />
                            <span className="danger">{this.state.error}</span>
                        </form>
                        {loader}
                    </div>
                </div>
            </div>
        );
    }
}

LoginComponent.propTypes = {
    history: PropTypes.object.isRequired,
    addUser: PropTypes.func,
};

LoginComponent.defaultProps = {
    history: {},
}

export default connect(null, { addUser })(LoginComponent);