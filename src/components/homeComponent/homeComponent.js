import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, {instanceOf} from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from "axios";
import { withCookies, Cookies } from 'react-cookie';

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        // this.getUserInfo = this.getUserInfo.bind(this);
        this.state = {
            userLoad: false,
            userInfo: {},
        }
    }

    componentDidMount() {
        var self = this;
        var data = {};
        var api = [];
        const { cookies } = self.props;
        var apiBaseUrl = "https://swapi.co/api/people/?search=";
        if(!cookies.get('name')){
            this.setState({redirectTo: true});
            return;
        }
        axios.get(apiBaseUrl + cookies.get('name')).then(function(resp) {
            data = resp.data.results[0];
            return Object.keys(data).map(function(item) {
                if(Array.isArray(data[item])){
                    return data[item].map((d,i) => {
                        return api.push(axios.get(data[item][i]).then(function(res) {
                            data[item][i] = res.data;
                        }));
                    });
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
        if (!Array.isArray(data)) {
            return data;
        }
        return(
            <table className="table table-bordered">
                <tbody>
                    {data.map((item) =>{
                        return (
                            Object.keys(item).map((key, pos) => (
                                <tr key={pos}><td>{key}: </td><td>{item[key]}</td></tr>
                            ))
                        );
                    })}
                </tbody>
            </table>
        );
    }

    signout(){
        const { cookies } = this.props;
        cookies.remove('name');
        this.props.history.push('/');
    }

    render() {
        let data = <tr></tr>;
        if (this.props.user.length && !this.state.userLoad) {
            // this.getUserInfo();
            data = <tr><td><div className="loader"></div></td></tr>;
        } else {
            data = Object.keys(this.state.userInfo).map((item, i) => (
                <tr key={i}>
                    <td>{item}</td>
                    <td>{HomeComponent.getUserFull(this.state.userInfo[item])}</td>
                </tr>
            ));
        }
        return (
            <div className="container">
                <MuiThemeProvider>
                    <div className="row">
                        <div className="row">
                            <div className="col-xs-offset-4 col-xs-4">
                                Welcome! {this.props.user[0]}
                            </div>
                            <div className="col-xs-4">
                                <RaisedButton label="Signout" primary={true}
                                    onClick={() => this.signout()}/>
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
        user: state.user,
    };
}

HomeComponent.propTypes = {
    user: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    cookies: instanceOf(Cookies).isRequired,
};

export default connect(mapStateToProps, null)(withCookies(HomeComponent));