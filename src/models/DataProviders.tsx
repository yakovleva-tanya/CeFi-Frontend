import axios from 'axios';
import { AssetReport } from "plaid";
import { dataProvidersURLs } from './../util/constants';

export interface BankInfoInterface {
  publicTokens: string[];
}

export interface BankInfoResponseInterface {
  assetReport: AssetReport;
  signature: string;
}

export const getBankInfo = (bankInfo: BankInfoInterface) => axios({
  method: 'post',
  url: dataProvidersURLs.bankInfo + '/bank-info',
  data: bankInfo
}); 

export interface CreateLinkTokenResponse {
  data: {
    linkToken: string
  }
}

export const createPlaidLinkToken = (address: string) => axios({
  method: 'post',
  url: dataProvidersURLs.bankInfo + '/create-link-token',
  data: { address }
}); 
