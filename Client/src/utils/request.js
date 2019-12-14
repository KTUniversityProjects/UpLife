import axios from "axios";

const apiUrl = "http://localhost:4000/";

const makePostRequest = (url, data) => {
  return axios
    .post(apiUrl + url, data, {
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`
      }
    })
    .then(data => {
      if (data.status === 200) return data.data;
      alert("Server is down");
      return null;
    })
    .catch(err => {
      return null;
    });
};

const makeGetRequest = url => {
  return axios
    .get(apiUrl + url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`
      }
    })
    .then(data => {
      if (data.status === 200) return data.data;
      alert("Server is down");
      return null;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};

const makePutRequest = (url, data) => {
  return axios
    .put(apiUrl + url, data, {
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`
      }
    })
    .then(data => {
      if (data.status === 200) return data.data;
      alert("Server is down");
      return null;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};

const makeDeleteRequest = url => {
  return axios
    .delete(apiUrl + url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`
      }
    })
    .then(data => {
      if (data.status === 200) return data.data;
      alert("Server is down");
      return null;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};

export { makePostRequest, makeGetRequest, makePutRequest, makeDeleteRequest };
