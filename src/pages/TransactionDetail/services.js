// import { api } from '../../utils/helper';

export const getTransactionInfo = () => {
  return fetch(`/assets/db/bank.json`, {
    method: 'GET',
  }).then(function (res) {
    return res.json();
  });
};
