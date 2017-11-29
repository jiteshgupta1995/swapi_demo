import React from 'react';
import { connect } from 'react-redux';
import HomeComponent from "../homeComponent/homeComponent";
import addSearch, {removeSearch} from "../../actions/search";
import PropTypes from "prop-types";

const HomeContainer = (props) => {
    return(
        <HomeComponent
            user={props.user}
            history={props.history}
            search={props.search}
            addSearch={props.addSearch}
            removeSearch={props.removeSearch}
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
};

HomeContainer.defaultProps = {
    user: "",
    search: [],
    history: {},
    addSearch: addSearch(),
    removeSearch: removeSearch(),
};

export default connect(mapStateToProps, { addSearch, removeSearch })(HomeContainer);