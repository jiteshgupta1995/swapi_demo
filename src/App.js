import React from 'react';
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

const App = (props) => {
    let redirect = <div></div>;
    if(props.location.pathname === "/"){
        redirect = <Redirect to={{
            pathname: '/login',
        }}/>;
    }
    return (
        <div className="App">
            {redirect}
        </div>
    );
};

App.propTypes = {
    location: PropTypes.object.isRequired,
};

export default App;
