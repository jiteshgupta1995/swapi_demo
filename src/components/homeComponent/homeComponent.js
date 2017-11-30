import React, { Component } from 'react';
import PropTypes from "prop-types";
import cookie from 'react-cookies';
import { apiCall } from "../../helper/NetworkRequest";
import DashboardComponent from "./dashboardComponent";

class HomeComponent extends Component {

    static sortBody(property) {
        return function(a, b) {
            const x = parseInt(a[property]);
            const y = parseInt(b[property]);
            if (a[property] === "unknown") {
                return 1;
            }
            const result = x < y ? -1 :
                x > y ? 1 : 0;
            return result * -1;
        };
    }

    constructor(props) {
        super(props);

        this.signout = this.signout.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.apiSuccessCallback = this.apiSuccessCallback.bind(this);
        this.apiFailureCallback = this.apiFailureCallback.bind(this);

        this.state = {
            user: "",
            searchItem: [],
            timer: null,
            loader: false,
        };
    }

    componentWillMount() {
        const { user } = this.props;
        const username = cookie.load('name');
        if (user) {
            cookie.save('name', user, { path: '/home' });
            this.setState({ user: user });
        } else {
            if(username){
                this.setState({ user: cookie.load('name') });
            }else{
                this.signout();
            }
        }
    }

    signout() {
        cookie.remove('name', { path: '/home' });
        this.props.removeSearch();
        this.props.removeUser();
        this.props.history.push('/');
    }

    onChangeHandler(e) {
        const keyword = e.target.value;
        let apiBaseUrl = "https://swapi.co/api/planets/?search=" + keyword;
        
        if (keyword.length < 2) {
            clearTimeout(this.state.timer);
            this.setState({
                searchItem: [],
                loader: false,
            });
            return;
        }

        clearTimeout(this.state.timer);
        this.setState({
            timer: setTimeout(()=>{
                this.getResult(apiBaseUrl, keyword);
            }, 500),
        });
    }

    getResult(url, keyword) {
        const { search } = this.props;
        this.setState({ loader: true });

        for (let i = 0; i < search.length; i++) {
            if (search[i].keyword === keyword) {
                this.setState({
                    searchItem: search[i].result,
                    loader: false,
                });
            }
        }

        apiCall(url)
            .then((resp) => this.apiSuccessCallback(resp, keyword))
            .catch((error) => this.apiFailureCallback(error));
    }

    apiSuccessCallback(resp, keyword) {
        let data = resp.data.results;
        data.sort(HomeComponent.sortBody("population"));

        this.setState({
            searchItem: data,
            loader: false,
        });
        this.props.addSearch(keyword, data);
    }

    apiFailureCallback(error) {
        this.setState({ loader: false });
        console.error(error);
    }

    render() {
        let loader = null;
        if (this.state.loader) {
            loader = <div>
                <div className="loader"></div>
                <div id="overlay"></div>
            </div>;
        } else {
            loader = null;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-8">
                        <div className="yellow">
                            <h1>Welcome! {this.state.user}</h1>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <button
                            className="btn btn-primary float-right margin-top25"
                            id="signoutBtn"
                            onClick={this.signout}
                        >
                        Signout
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-group">
                            <label className="yellow">Search planet</label>
                            <input
                                type="text"
                                className="form-control"
                                id="userInput"
                                onChange={this.onChangeHandler}
                                disabled={this.state.loader}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <DashboardComponent
                            searchItem={this.state.searchItem}
                        />
                        {loader}
                    </div>
                </div>
            </div>
        );
    }
}

HomeComponent.propTypes = {
    user: PropTypes.string.isRequired,
    search: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    addSearch: PropTypes.func.isRequired,
    removeSearch: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
};

HomeComponent.defaultProps = {
    user: "",
    search: [],
    history: {},
};

export default HomeComponent;