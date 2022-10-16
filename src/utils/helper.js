import axios from 'axios';

const apiGateWay = (apiMethod, res) => {
  const gateway = {
    url: `${res.url}`,
    method: apiMethod,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    withCredentials: true,
    // responseType: 'json',
  };

  if (apiMethod === 'GET' && res.params) {
    gateway.params = res.params;
  }

  if (apiMethod === 'POST' || apiMethod === 'PUT') {
    gateway.data = JSON.stringify(res.data);
  }

  if (apiMethod === 'FORMDATA') {
    gateway.method = 'POST';
    gateway.headers = {
      'Content-Type': 'multipart/form-data',
    };
    gateway.data = res.data;
  }

  return gateway;
};

export const api = {
  get: request => {
    return axios(apiGateWay('GET', request));
  },
  post: request => {
    return axios(apiGateWay('POST', request));
  },
  put: request => {
    return axios(apiGateWay('PUT', request));
  },
  patch: request => {
    return axios(apiGateWay('PATCH', request));
  },
  delete: request => {
    return axios(apiGateWay('DELETE', request));
  },
  postFormData: request => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    return axios.post(`${request.url}`, request.data, config);
  },
  multipartMethods: request => {
    return axios(apiGateWay('FORMDATA', request));
  },
};
