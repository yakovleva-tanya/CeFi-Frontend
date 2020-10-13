/**
 * ArrowheadCRA API interface.
 *
 * @namespace ArrowheadCRA 
 * @category ReactModels
 */
 

import axios from 'axios';
import { craURLs } from './../util/constants';
import { fromRpcSig, bufferToHex } from "ethereumjs-util";

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
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
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
  for(let i = 0; i < Object.keys(craURLs.arrowhead).length; i++) {
    const response = await sendLendingApplication(lendingApplication, craURLs.arrowhead[i]);
    const sig = response.data.result.signature;
    const { r, s, v } = fromRpcSig(sig);
    const result = {
      collateralRatio: response.data.result.collateralRatio,
      consensusAddress: response.data.result.consensusAddress,
      interestRate: response.data.result.interestRate,
      maxLoanAmount: response.data.result.maxLoanAmount,
      requestHash: response.data.result.requestHash,
      responseTime: response.data.result.responseTime,
      signature: {​​​
        r: bufferToHex(r),
        s: bufferToHex(s),
        v: String(v),
        signerNonce: response.data.result.signerNonce
      },
      signer: response.data.result.signer
    }
    responses.push(result);
  }
  return responses;
}
