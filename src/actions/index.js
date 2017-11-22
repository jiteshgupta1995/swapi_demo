export const SET_USER = "SET_USER";
export const SET_SEARCH = "SET_SEARCH";

export default function addUser(name) {
    const action = {
        type: SET_USER,
        name: name,
    }
    return action;
}

export function addSearch(keyword, result) {
    const action = {
        type: SET_SEARCH,
        keyword: keyword,
        result: result,
    }
    return action;
}