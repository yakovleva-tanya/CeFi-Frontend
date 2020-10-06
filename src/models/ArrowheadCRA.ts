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
  loanTermLength: string;
  collateralRatioEntered: string;
  loanUse: string;
  assetReportStringified?: string;
  assetReportSignature?: string; 
  ethereumWallet?: string;
};

/**
 * Send information to the Arrowhead CRA & Get Loan Terms
 */
export const sendLendingApplication = (lendingApplication: LendingApplication, craURL: string) => axios({
  method: 'post',
  url: craURL,
  data: {
    jsonrpc: '2.0',
    method: 'arrowheadCRA',
    id: 1,
    params: lendingApplication
  }
})

/**
 * Arrowhead CRA requests
 */
export const arrowheadCRA = async (lendingApplication: LendingApplication) => {
  const responses = [];
  for(var i = 0; i < Object.keys(craURLs.arrowhead).length; i++) {
    let response = await sendLendingApplication(lendingApplication, craURLs.arrowhead[i]);
    let result = {
      collateralRatio: response.data.result.collateralRatio,
      consensusAddress: response.data.result.consensusAddress,
      responseTime: response.data.result.responseTime,
      interestRate: response.data.result.interestRate,
      minCollateralRatio: response.data.result.minCollateralRatio,
      maxLoanAmount: response.data.result.maxLoanAmount,
      signature: {
        signerNonce: response.data.result.signature.signerNonce,
        r: response.data.result.signature.r.data,
        s: response.data.result.signature.s.data,
        v: response.data.result.signature.v.data,
      },
      signer: response.data.result.signer
    }
    responses.push(result);
  }
  return responses;
}
