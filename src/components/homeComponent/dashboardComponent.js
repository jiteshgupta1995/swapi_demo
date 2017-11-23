import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from "prop-types";

const presentationalComponent = (props) =>{
    return(
        <MuiThemeProvider>
            <div className="row">
                <div className="row">
                    <div className="col-xs-offset-4 col-xs-4">
                        <h1>Welcome! {props.user}</h1>
                    </div>
                    <div className="col-xs-4">
                        <RaisedButton className="float-right" label="Signout" primary={true}
                            onClick={() => props.signout()}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <label>Enter text</label>
                        <input type="text" className="form-control" id="userInput"
                            onChange={props.onChangeHandler}
                        />
                    </div>
                </div>
                <div className="row">
                    {props.list}
                </div>
            </div>
        </MuiThemeProvider>
    );
};

presentationalComponent.propTypes = {
    user: PropTypes.string.isRequired,
    list: PropTypes.object.isRequired,
    signout: PropTypes.func.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
};

presentationalComponent.defaultProps = {
    user: "Logged in user",
};

export default presentationalComponent;