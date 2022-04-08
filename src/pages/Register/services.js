// import { api } from '../../utils/helper';

export const registerAccount = payload => {
  return fetch('https://reqres.in/api/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then(function (res) {
    return res.json();
  });
  // return api
  //   .post({
  //     url: `https://reqres.in/api/users`,
  //     data: payload,
  //   })
  //   .then(response => {
  //     return response.data;
  //   });
};
