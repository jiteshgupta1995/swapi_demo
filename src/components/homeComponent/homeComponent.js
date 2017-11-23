import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { apiCall } from "../../helper/NetworkRequest";
import addSearch from "../../actions/search";
import DashboardComponent from "./dashboardComponent";

var timer = null;
class HomeComponent extends Component {

    static sortBody(property) {
        return function(a, b) {
            if(a[property]=== "unknown"){
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
        this.apiCallback = this.apiCallback.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.timeoutCallback = this.timeoutCallback.bind(this);
        this.state = {
            searchItem: [],
        };
    }

    signout() {
        this.props.history.push('/');
    }

    apiCallback(resp, keyword){
        var data = resp.data.results;
        data.sort(HomeComponent.sortBody("population"));
        this.setState({ searchItem: data });
        this.props.addSearch(keyword, data);
        return;
    }

    getResult(url, keyword) {
        var {search} = this.props;
        for (var i = 0; i < search.length; i++) {
            if (search[i].keyword === keyword) {
                this.setState({ searchItem: search[i].result });
            }
        }

        apiCall(url).then((resp)=> this.apiCallback(resp, keyword));
    }

    timeoutCallback(apiBaseUrl, value){
        this.getResult(apiBaseUrl, value);
        return;
    }

    onChangeHandler(e) {
        var apiBaseUrl = "https://swapi.co/api/planets/?search=" + e.target.value;
        if (e.target.value.length < 2) {
            clearTimeout(timer);
            return;
        }
        e.persist();
        clearTimeout(timer);
        timer = setTimeout(this.timeoutCallback(apiBaseUrl, e.target.value), 500);
    }

    render() {
        var list = <div></div>;
        const fontSize = 30;
        if (this.state.searchItem.length) {
            list = <div className="col-xs-12">
                {this.state.searchItem.map((item,i) =>{
                    var size = fontSize - i;
                    return(
                        <div className="row" key={i}>
                            <div className="col-xs-3" style={{fontSize:size+'px'}}>
                                {item.name}
                            </div>
                            <div className="col-xs-3" style={{fontSize:size+'px'}}>
                                {item.population}
                            </div>
                        </div>
                    );
                })}
            </div>;
        } else {
            list = <div>No result found.</div>;
        }
        return (
            <div className="container">
                <DashboardComponent
                    signout={this.signout}
                    user={this.props.user}
                    list={list}
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
};

export default connect(mapStateToProps, { addSearch })(HomeComponent);