import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import addUser from "../actions/user";
import { bindActionCreators } from 'redux';
import LoginComponent from "../components/loginComponent/loginComponent";

const loginContainer = (props) =>{
    return(
        <LoginComponent
            history={props.history}
            addUser={props.addUser}
        />
    );
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addUser: addUser,
    }, dispatch);
}

loginContainer.propTypes = {
    history: PropTypes.object.isRequired,
    addUser: PropTypes.func,
};

loginContainer.defaultProps = {
    history: {},
    addUser: addUser,
};

export default connect(null, mapDispatchToProps)(loginContainer);