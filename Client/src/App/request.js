import { apiUrl } from "./api";
import axios from 'axios';

const makePostRequest = (url, data) => {
    return axios.post(apiUrl + url, data).then(data => {
        if (data.status === 200)
            return data.data;
        alert("Server is down");
        return null;
    }).catch(err => {
        console.log(data);
        return null;
    });
}

/*const makePostRequest = async (url, data) => {
    try {
        const data = await axios.post(url, data);
        if (data.status == 200) {
            return data.data
        }
    } catch (err) {
        return null;
    }
}*/

const makeGetRequest = (url) => {
    return axios.get(apiUrl + url).then(data => {
        if (data.status === 200)
            return data.data;
        alert("Server is down");
        return null;
    }).catch(err => {
        return null;
    });
}

export {
    makePostRequest,
    makeGetRequest
}