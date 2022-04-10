// import { api } from '../../utils/helper';

//Fake API for registration
export const registerAccount = payload => {
  return fetch('https://reqres.in/api/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then(function (res) {
    return res.json();
  });
};
