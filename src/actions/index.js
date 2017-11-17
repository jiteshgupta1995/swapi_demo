export const SET_USER = "SET_USER";

export default function addUser(name) {
    const action = {
        type: SET_USER,
        name: name,
    }
    return action;
}