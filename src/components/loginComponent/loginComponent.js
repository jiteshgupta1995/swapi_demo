import React, { Component } from 'react';
import PropTypes from "prop-types";
import { apiCall } from "../../helper/NetworkRequest";

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
        let apiBaseUrl = "https://swapi.co/api/people/?search="+this.state.username;
        
        apiCall(apiBaseUrl)
            .then((resp) => this.apiSuccessCallback(resp))
            .catch((error) => this.apiFailureCallback(error));
    }

    apiSuccessCallback(resp) {
        let len = resp.data.results.length;
        let errorMsg = "Username does not exist";
        const username = this.state.username;

        for (let i = 0; i < len; i++) {
            if (resp.data.results[i].name === username) {
                if (resp.data.results[i].birth_year === this.state.dob) {
                    errorMsg = "";
                    this.props.addUser(username);
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
        console.error(error);
    }

    onChangeHandler(event) {
        this.setState({[event.target.id]: event.target.value });
    }

    render() {
        let loader = null;
        if(this.state.loader){
            loader = <div>
                <div className="loader"></div>
                <div id="overlay"></div>
            </div>;
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
                            <span className="danger">{this.state.error}</span>
                            <br />
                            <button
                                id="loginButton"
                                className="btn btn-primary btn-block"
                                type="submit"
                            >
                            LOGIN
                            </button>
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
    addUser: PropTypes.func.isRequired,
};

LoginComponent.defaultProps = {
    history: {},
};

export default LoginComponent;