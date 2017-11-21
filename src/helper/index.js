import axios from "axios";

export function apiCall(url){
    return axios.get(url).then(function(resp){
        return resp;
    });
}