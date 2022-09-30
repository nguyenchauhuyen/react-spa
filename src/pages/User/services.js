// import { api } from '../../utils/helper';

//Fake API for registration
export const getUserInfo = ({ username }) => {
  return fetch(`https://api.github.com/users/${username}`, {
    method: 'GET',
  }).then(function (res) {
    return res.json();
  });
};
