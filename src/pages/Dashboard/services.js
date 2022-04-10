// import { api } from '../../utils/helper';

export const getRepositories = payload => {
  return fetch(`https://api.github.com/users/${payload.username}/repos`, {
    method: 'GET',
  }).then(function (res) {
    return res.json();
  });
};

//Fake API for Linkedin sharing
export const shareLinkedin = payload => {
  return fetch('https://reqres.in/api/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then(function (res) {
    return res.json();
  });
};
