import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import addUser from "../actions/user";
import LoginComponent from "../components/loginComponent/loginComponent";

const loginContainer = (props) =>{
    return(
        <LoginComponent
            history={props.history}
            addUser={props.addUser}
        />
    );
};

loginContainer.propTypes = {
    history: PropTypes.object.isRequired,
    addUser: PropTypes.func,
};

loginContainer.defaultProps = {
    history: {},
    addUser: addUser(),
};

export default connect(null, { addUser })(loginContainer);