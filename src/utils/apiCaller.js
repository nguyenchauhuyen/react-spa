import axios from 'axios';
import * as Config from './../constants/Config';

export function callApi(endpoint, method = 'GET', body) {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
  }).catch(err => {
    console.log(err);
  });
}

export async function callApiAsync(endpoint, method = 'GET', body) {
  const res = await axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
  });
  return res;
}
