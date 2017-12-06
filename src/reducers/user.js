import { SET_USER, REMOVE_USER } from "../actions/user";

function user(state = "", action) {
    switch (action.type) {
    case SET_USER:
        return action.name;
    case REMOVE_USER:
        return "";
    default:
        return state;
    }
}

export default user;