/**
 * ArrowheadCRA API interface.
 *
 * @namespace ArrowheadCRA 
 * @category ReactModels
 */
 

import axios from 'axios';
import { craURLs } from './../util/constants';

export interface LendingApplication {
  borrowedAsset: string;
  collateralAsset: string;
  requestedLoanSize: string;
  loanTermLength: number;
  collateralRatioEntered: number;
  loanUse: string;
  assetReportStringified?: string;
  assetReportSignature?: string; 
  ethereumWallet?: string;
};

/**
 * Send bank information to the Arrowhead CRA.
 */
// export const sendLendingApplication = (lendingApplication: LendingApplication) => axios({
//   method: 'post',
//   url: craURLs.arrowhead,
//   data: {
//     id: 1,
//     jsonrpc: '2.0',
//     method: 'arrowheadCRA',
//     params: lendingApplication
//   }
// }); 

/**
 * Get Loan Terms
 */
export const sendLendingApplication = (lendingApplication: LendingApplication) => axios({
  method: 'post',
  url: craURLs.arrowhead,
  data: {
    jsonrpc: '2.0',
    method: 'arrowheadCRA',
    id: 1,
    params: lendingApplication
  }
})