import React from "react";
import PropTypes from "prop-types";

const dashboardComponent = ({user, signout, onChangeHandler, list, loader}) =>{
    return(
        <div className="row">
            <div className="row">
                <div className="col-xs-8">
                    <div className="yellow">
                        <h1>Welcome! {user}</h1>
                    </div>
                </div>
                <div className="col-xs-4">
                    <button
                        className="btn btn-primary float-right margin-top25"
                        id="signoutBtn"
                        onClick={signout}
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
                            onChange={onChangeHandler}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    {list}
                    {loader}
                </div>
            </div>
        </div>
    );
};

dashboardComponent.propTypes = {
    user: PropTypes.string.isRequired,
    list: PropTypes.object.isRequired,
    loader: PropTypes.object.isRequired,
    signout: PropTypes.func.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
};

dashboardComponent.defaultProps = {
    user: "Logged in user",
    list: {},
};

export default dashboardComponent;