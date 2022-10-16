// import { api } from '../../utils/helper';

export const getRepositories = () => {
  return fetch(`/assets/db/bank.json`, {
    method: 'GET',
  }).then(function (res) {
    return res.json();
  });
};
