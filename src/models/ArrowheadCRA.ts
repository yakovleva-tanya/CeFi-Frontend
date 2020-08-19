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
  requestedLoanSize: number;
  loanTermLength: number;
  collateralPercentEntered: number;
  loanUse: string;
  assetReportStringified?: string;
  assetReportSignature?: string; 
  ethereumWallet?: string;
  nonce: string;
  nonceSignature: string;
};

/**
 * Send bank information to the Arrowhead CRA.
 */
export const sendLendingApplication = (lendingApplication: LendingApplication) => axios({
  method: 'post',
  url: craURLs.arrowhead,
  data: {
    id: 1,
    jsonrpc: '2.0',
    method: 'arrowheadCRA',
    params: lendingApplication
  }
}); 
