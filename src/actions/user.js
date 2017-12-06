export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

export default function addUser(name) {
    const action = {
        type: SET_USER,
        name: name,
    }
    return action;
}

export function removeUser(){
    const action = {
        type: REMOVE_USER,
    };
    return action;
}