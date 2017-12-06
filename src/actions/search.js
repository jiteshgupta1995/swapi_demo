export const SET_SEARCH = "SET_SEARCH";
export const REMOVE_SEARCH = "REMOVE_SEARCH";

export default function addSearch(keyword, result) {
    const action = {
        type: SET_SEARCH,
        keyword: keyword,
        result: result,
    };
    return action;
}

export function removeSearch(){
    const action = {
        type: REMOVE_SEARCH,
    };
    return action;
}