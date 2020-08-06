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
  assetReportStringified: string;
  assetReportSignature: string;
  ethereumWallet: string;
};

/**
 * Send bank information to the Arrowhead CRA.
 */
export const sendLendingApplication = (lendingApplication: LendingApplication) => axios({
  method: 'post',
  url: craURLs.arrowhead,
  data: lendingApplication
}); 
