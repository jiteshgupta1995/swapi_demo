export const SET_SEARCH = "SET_SEARCH";

export default function addSearch(keyword, result) {
    const action = {
        type: SET_SEARCH,
        keyword: keyword,
        result: result,
    }
    return action;
}