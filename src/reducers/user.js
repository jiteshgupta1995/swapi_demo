import { SET_USER } from "../actions/user";

function user(state = "", action) {
    switch (action.type) {
    case SET_USER:
        return action.name;
    default:
        return state;
    }
}

export default user;