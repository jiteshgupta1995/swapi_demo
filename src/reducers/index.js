import { combineReducers } from "redux";
import { SET_USER } from "../actions";

function user(state = [], action) {
    switch (action.type) {
    case SET_USER:
        return [action.name];
    default:
        return state;
    }
}

const rootUser = combineReducers({ user });
export default rootUser;