import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import cookie from 'react-cookies';
import { apiCall } from "../../helper/NetworkRequest";
import addSearch from "../../actions/search";
import DashboardComponent from "./dashboardComponent";

class HomeComponent extends Component {

    static sortBody(property) {
        return function(a, b) {
            if (a[property] === "unknown") {
                return 1;
            }
            var result = (parseInt(a[property]) < parseInt(b[property])) ? -1 :
                (parseInt(a[property]) > parseInt(b[property])) ? 1 : 0;
            return result * -1;
        };
    }

    constructor(props) {
        super(props);
        this.signout = this.signout.bind(this);
        this.getResult = this.getResult.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.timeoutCallback = this.timeoutCallback.bind(this);
        this.apiSuccessCallback = this.apiSuccessCallback.bind(this);
        this.apiFailureCallback = this.apiFailureCallback.bind(this);
        this.state = {
            user: "",
            searchItem: [],
            timer: null,
            loader: false,
        };
    }

    componentDidMount(){
        if(this.props.user !== ""){
            cookie.save('name', this.props.user, { path: '/home' });
            this.setState({user: this.props.user});
        }else{
            this.setState({user: cookie.load('name')});
        }
    }

    signout() {
        this.props.history.push('/');
    }

    getResult(url, keyword) {
        var { search } = this.props;
        this.setState({loader: true});
        for (var i = 0; i < search.length; i++) {
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
        var data = resp.data.results;
        data.sort(HomeComponent.sortBody("population"));
        this.setState({
            searchItem: data,
            loader: false,
        });
        this.props.addSearch(keyword, data);
    }

    apiFailureCallback(error) {
        this.setState({loader: false});
        console.error(error.response.status);
    }

    onChangeHandler(e) {
        var apiBaseUrl = "https://swapi.co/api/planets/?search=" + e.target.value;
        if (e.target.value.length < 2) {
            clearTimeout(this.state.timer);
            this.setState({
                searchItem: [],
                loader: false,
            });
            return;
        }
        clearTimeout(this.state.timer);
        this.setState({
            timer: setTimeout(this.timeoutCallback(apiBaseUrl, e.target.value), 500),
        });
    }

    timeoutCallback(apiBaseUrl, value) {
        this.getResult(apiBaseUrl, value);
    }

    render() {
        let list = <div></div>;
        let loader = <div></div>;
        const fontSize = 30;
        if (this.state.searchItem.length) {
            list = <div className="response">
                {this.state.searchItem.map((item,i) =>{
                    let size = fontSize - i;
                    let pop = item.population;
                    if(item.population === "unknown"){
                        pop = "0";
                    }
                    return(
                        <div className="row" key={i}>
                            <div className="col-xs-3" style={{fontSize:size+'px'}}>
                                {item.name}
                            </div>
                            <div className="col-xs-3" style={{fontSize:size+'px'}}>
                                {pop}
                            </div>
                        </div>
                    );
                })}
            </div>;
        } else {
            list = <div className="response">No result found.</div>;
        }
        if(this.state.loader){
            loader=<div className="loader"></div>;
        }else{
            loader=<div></div>;
        }
        return (
            <div className="container">
                <DashboardComponent
                    signout={this.signout}
                    user={this.state.user}
                    list={list}
                    loader={loader}
                    onChangeHandler={this.onChangeHandler}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        search: state.search,
    };
}

HomeComponent.propTypes = {
    user: PropTypes.string.isRequired,
    search: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    addSearch: PropTypes.func,
};

HomeComponent.defaultProps = {
    user: "Logged in user",
    search: [],
    history: {},
};

export default connect(mapStateToProps, { addSearch })(HomeComponent);