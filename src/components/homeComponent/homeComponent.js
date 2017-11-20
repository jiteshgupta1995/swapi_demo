import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from "axios";

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userLoad: false,
            userInfo: {},
        }
    }

    componentDidMount() {
        var self = this;
        var data = {};
        var api = [];
        var apiBaseUrl = "https://swapi.co/api/people/?search=";
        axios.get(apiBaseUrl + this.props.user).then(function(resp) {
            data = resp.data.results[0];
            return Object.keys(data).map(function(item) {
                if(Array.isArray(data[item])){
                    return data[item].map((d,i) => {
                        return api.push(axios.get(data[item][i]).then(function(res) {
                            data[item][i] = res.data;
                        }));
                    });
                }else if(data[item].indexOf("http") > -1){
                    return api.push(axios.get(data[item]).then(function(res) {
                        data[item] = res.data;
                    }));
                }
            });
        }).then(function() {
            axios.all(api).then(axios.spread(function () {
                self.setState({
                    userInfo: data,
                    userLoad: true,
                });
            }));
            
        }).catch(function(error) {
            console.error(error);
        });
    }

    static getUserFull(data) {
        if (!Array.isArray(data) && typeof data !== "object") {
            return data;
        }else if(!Array.isArray(data) && typeof data === "object"){
            return (
                <table className="table table-bordered">
                    <tbody>
                        {Object.keys(data).map((key, pos) => (
                            <tr key={pos}><td>{key}: </td><td>{data[key]}</td></tr>
                        ))}
                    </tbody>
                </table>
            );
        }else{
            return(
                data.map((item,i) =>{
                    return (
                        <table className="table table-bordered" key={i}>
                            <tbody>
                                {Object.keys(item).map((key, pos) => (
                                    <tr key={pos}><td>{key}: </td><td>{item[key]}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    );
                })
            );
        }
    }


    render() {
        let data = <tr></tr>;
        if (this.state.userLoad) {
            // this.getUserInfo();
            data = Object.keys(this.state.userInfo).map((item, i) => (
                <tr key={i}>
                    <td>{item}</td>
                    <td>{HomeComponent.getUserFull(this.state.userInfo[item])}</td>
                </tr>
            ));
        } else {
            data = <tr><td><div className="loader"></div></td></tr>;
        }
        return (
            <div className="container">
                <MuiThemeProvider>
                    <div className="row">
                        <div className="row">
                            <div className="col-xs-offset-4 col-xs-4">
                                Welcome! {this.props.user}
                            </div>
                            <div className="col-xs-4">
                                <RaisedButton label="Signout" primary={true}
                                    onClick={() => this.props.history.push('/')}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <tbody>
                                        {data}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
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

export default connect(mapStateToProps, null)(HomeComponent);