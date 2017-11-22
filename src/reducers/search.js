import { SET_SEARCH } from "../actions";

function search(state = [], action) {
    switch (action.type) {
    case SET_SEARCH:
        var data = [...state];
        if (data.length === 15) {
            data.splice(14, 1);
        }
        for (var i = 0; i < data.length; i++) {
            if (data[i].keyword === action.keyword) {
                data.splice(i, 1);
                break;
            }
        }
        var x = [];
        x.push({
            keyword: action.keyword,
            result: action.result,
        });
        if(data.length !== 0){
            x = x.concat(data);
        }
        return x;
    default:
        return state;
    }
}

export default search;