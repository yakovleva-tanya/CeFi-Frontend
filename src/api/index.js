import axios from 'axios';
import { serverURL } from './../util/constants';

const createAccounts = (address: string) => {
  return axios.post(serverURL, {
    jsonrpc: '2.0',
    method: 'createAccount',
    id: '1',
    params: { wallet: address }
  });
};

export default {
  createAccounts,
};
