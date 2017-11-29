import React from "react";
import PropTypes from "prop-types";

const dashboardComponent = ({list, loader}) =>{
    return(
        <div className="row">
            {list}
            {loader}
        </div>
    );
};

dashboardComponent.propTypes = {
    list: PropTypes.object.isRequired,
    loader: PropTypes.object,
};

dashboardComponent.defaultProps = {
    list: {},
    loader: {},
};

export default dashboardComponent;