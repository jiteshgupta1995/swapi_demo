import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from "prop-types";

const dashboardComponent = ({user, signout, onChangeHandler, list}) =>{
    return(
        <MuiThemeProvider>
            <div className="row">
                <div className="row">
                    <div className="col-xs-offset-4 col-xs-4">
                        <h1>Welcome! {user}</h1>
                    </div>
                    <div className="col-xs-4">
                        <RaisedButton
                            className="float-right"
                            label="Signout"
                            primary={true}
                            onClick={signout}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <label>Enter text</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userInput"
                            onChange={onChangeHandler}
                        />
                    </div>
                </div>
                <div className="row">
                    {list}
                </div>
            </div>
        </MuiThemeProvider>
    );
};

dashboardComponent.propTypes = {
    user: PropTypes.string.isRequired,
    list: PropTypes.object.isRequired,
    signout: PropTypes.func.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
};

dashboardComponent.defaultProps = {
    user: "Logged in user",
    list: {},
};

export default dashboardComponent;