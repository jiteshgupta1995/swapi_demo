import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { apiCall } from "../../helper";
import PresentationalComponent from "./presentationalComponent";

var timer = null;
class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
        this.signout = this.signout.bind(this);
        this.state = {
            searchItems: [],
        }
    }

    signout() {
        this.props.history.push('/');
    }

    static sortBody(property) {
        return function(a, b) {
            var result = (parseInt(a[property]) < parseInt(b[property])) ? -1 :
                (parseInt(a[property]) > parseInt(b[property])) ? 1 : 0;
            return result*-1;
        };
    }

    getNextPage(url, data=[]) {
        var self = this;
        if (url !== null) {
            apiCall(url).then(function(d) {
                var len = d.data.results.length;
                for (var i = 0; i < len; i++) {
                    data.push(d.data.results[i]);
                }
                data.sort(HomeComponent.sortBody("population"));
                self.setState({
                    searchItems: data,
                });
                self.getNextPage(d.data.next, data);
            });
        } else {
            data.sort(HomeComponent.sortBody("population"));
            self.setState({
                searchItems: data,
            });
        }
    }

    onChangeHandler(e) {
        var self = this;
        var apiBaseUrl = "https://swapi.co/api/planets/?search=" + e.target.value;
        if(e.target.value === ""){
            return;
        }
        clearTimeout(timer);
        timer = setTimeout(function(){
            self.getNextPage(apiBaseUrl)
        }, 500);
    }

    render() {
        var list = <div></div>;
        const fontSize = 40;
        if (this.state.searchItems.length) {
            list = <div className="col-xs-12">
                {this.state.searchItems.map((item,i) =>{
                    var size = fontSize - i;
                    if(size < 10)
                        size = 10;
                    return(
                        <div key={i}>
                            Planet Name: {item.name},&nbsp;
                            Population: <span style={{fontSize:size+'px'}}>{item.population}</span>
                        </div>
                    );
                })}
            </div>;
        }
        return (
            <div className="container">
                <PresentationalComponent signout={this.signout} user={this.props.user} list={list}
                    onChangeHandler={this.onChangeHandler} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state,
    };
}

HomeComponent.propTypes = {
    user: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
};

HomeComponent.defaultProps = {
    user: "Logged in user",
};

export default connect(mapStateToProps, null)(HomeComponent);