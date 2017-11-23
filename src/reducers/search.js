import { SET_SEARCH } from "../actions/search";

function search(state = [], action) {
    switch (action.type) {
    case SET_SEARCH:
        var data = [...state];
        for (var i = 0; i < data.length; i++) {
            if (data[i].keyword === action.keyword) {
                data.splice(i, 1);
                data.unshift({
                    keyword: action.keyword,
                    result: action.result,
                });
                break;
            }
        }
        if (data.length === 15) {
            data.splice(14, 1);
        }
        return data;
    default:
        return state;
    }
}

export default search;