import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { apiCall } from "../../helper";
import { addSearch } from "../../actions";
import PresentationalComponent from "./presentationalComponent";

var timer = null;
class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.signout = this.signout.bind(this);
        this.getResult = this.getResult.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            searchItem: [],
        };
    }

    signout() {
        this.props.history.push('/');
    }

    static sortBody(property) {
        return function(a, b) {
            var result = (parseInt(a[property]) < parseInt(b[property])) ? -1 :
                (parseInt(a[property]) > parseInt(b[property])) ? 1 : 0;
            return result * -1;
        };
    }

    getResult(url, keyword) {
        var self = this;
        for (var i = 0; i < this.props.search.length; i++) {
            if (this.props.search[i].keyword === keyword) {
                this.setState({ searchItem: this.props.search[i].result });
            }
        }
        apiCall(url).then(function(d) {
            var data = d.data.results;
            data.sort(HomeComponent.sortBody("population"));
            self.setState({ searchItem: data });
            self.props.addSearch(keyword, data);
        });
    }

    onChangeHandler(e) {
        var apiBaseUrl = "https://swapi.co/api/planets/?search=" + e.target.value;
        if (e.target.value.length < 2) {
            clearTimeout(timer);
            return;
        }
        e.persist();
        var self = this;
        clearTimeout(timer);
        timer = setTimeout(function() {
            self.getResult(apiBaseUrl, e.target.value);
        }, 500);
    }

    render() {
        var list = <div></div>;
        const fontSize = 40;
        if (this.state.searchItem.length) {
            list = <div className="col-xs-12">
                {this.state.searchItem.map((item,i) =>{
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
        } else {
            list = <div>No result found.</div>;
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
        user: state.user,
        search: state.search,
    };
}

HomeComponent.propTypes = {
    user: PropTypes.string.isRequired,
    search: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

HomeComponent.defaultProps = {
    user: "Logged in user",
};

export default connect(mapStateToProps, { addSearch })(HomeComponent);