import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {removeUser} from "../actions/user";
import addSearch, {removeSearch} from "../actions/search";
import HomeComponent from "../components/homeComponent/homeComponent";

const HomeContainer = (props) => {
    return(
        <HomeComponent
            user={props.user}
            history={props.history}
            search={props.search}
            addSearch={props.addSearch}
            removeSearch={props.removeSearch}
            removeUser={props.removeUser}
        />
    );
};

function mapStateToProps(state) {
    return {
        user: state.user,
        search: state.search,
    };
}

HomeContainer.propTypes = {
    user: PropTypes.string.isRequired,
    search: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    addSearch: PropTypes.func,
    removeSearch: PropTypes.func,
    removeUser: PropTypes.func,
};

HomeContainer.defaultProps = {
    user: "",
    search: [],
    history: {},
    addSearch: addSearch(),
    removeSearch: removeSearch(),
    removeUser: removeUser(),
};

export default connect(mapStateToProps, { addSearch, removeSearch, removeUser })(HomeContainer);