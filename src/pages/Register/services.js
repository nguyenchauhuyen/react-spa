import { api } from '../../utils/helper';

export const registerAccount = payload => {
  return api
    .post({
      url: `https://jsonplaceholder.typicode.com/posts`,
      data: payload,
    })
    .then(response => {
      return response.data;
    });
};
