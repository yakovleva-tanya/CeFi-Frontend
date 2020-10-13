import Axios from "axios";
import { bufferToHex } from "ethereumjs-util";
import { fromRpcSig } from "ethereumjs-util";
import { useContext } from "react";
import { AppContext } from "../context/app";
import { NULL_ADDRESS } from "../util/constants";

export type PBorrow = {
  requestedLoanSize: string; // wei
  borrowedAsset: string;
  collateralAsset: string;
  loanTermLength: string; // seconds
  collateralRatioEntered: string; // 100% === 10000
  loanUse: string;
  ethereumWallet: string;
  assetReportStringified?: string | null;
  assetReportSignature?: string | null;
  requestTime: string // seconds at least 100 in the past
}
export type RBorrow = RArrowheadCRA[];

export type JSONRPCResponse<T> = {
  result: T
}

export type RArrowheadCRA = {
  /**
   * Address of the validator's wallet
   */
  signer: string;
  /**
   * The interest rate for the loan, e.g. 3.8% === 380 (10000:1).
   */
  interestRate: string;
  /**
   * Hash of the fields provided in the original request.
   */
  requestHash: string;
  /**
   * Collateral ratio for the loan (10000:1).
   */
  collateralRatio: string;
  /**
   * Maximum loan amount in 18 decimal uint (X * 10 ** 18).
   */
  maxLoanAmount: string; // X * 1e18
  /**
   * On-chain consensus address.
   */
  consensusAddress: string; // address
  /**
   * UNIX timestamp of the response (flat amount over requestTime).
   */
  responseTime: string; // uint256 seconds
  /**
   * Chain ID where this signature is valid (1: mainnet, 3: ropsten)
   */
  chainId: string;
  signerNonce: string;
  signature: string;
};

export function getNodeSignaturesForBorrowing(params: PBorrow, id = 1): Promise<RBorrow> {
  const nodeUrls = ["https://node-tpscrpt.layr1.com", "https://node-saxle.layr1.com"];
  return Promise.all(nodeUrls.map(async (nodeUrl) => {
    const response = await Axios.post<JSONRPCResponse<RArrowheadCRA>>(nodeUrl, {
      jsonrpc: "2.0",
      id,
      method: "arrowheadCRA",
      params
    }, {
      headers: {
        'Content-Type': "application/json",
        "Accept": "application/json"
      }
    });
    return response.data.result;
  }))
}

export function submitSignaturesToChainForBorrowing(
  borrowParams: PBorrow,
  responses: RArrowheadCRA[],
  requestNonce: string,
  amount: string,
  collateralAmount: string,
  loansInstance: any
): Promise<void> {

  return new Promise((resolve, reject)=> {
    loansInstance.methods.createLoanWithTerms(
      { // params
        borrower: borrowParams.ethereumWallet,
        recipient: NULL_ADDRESS,
        consensusAddress: responses[0].consensusAddress,
        requestNonce,
        duration: borrowParams.loanTermLength,
        borrowedAsset: borrowParams.borrowedAsset,
        collateralAsset: borrowParams.collateralAsset,
        requestTime: borrowParams.requestTime,
        amount,
      },
      responses.map(response => { // validator responses
        const { r, s, v } = fromRpcSig(response.signature);
        return {
          consensusAddress: response.consensusAddress,
          responseTime: response.responseTime,
          interestRate: response.interestRate,
          collateralRatio: response.collateralRatio,
          maxLoanAmount: response.maxLoanAmount,
          signer: response.signer,
          signature: {
            signerNonce: response.signerNonce,
            r: bufferToHex(r),
            s: bufferToHex(s),
            v,
          },
        }
      }),
      collateralAmount // amount of collateral to include in the transaction
    )
    .send({
      from: borrowParams.ethereumWallet,
      value: collateralAmount,
    })
    .on("transactionHash", (hash: string) => console.log(`Transaction hash for loan request: ${hash}`))
    .on("receipt", resolve)
    .on("error", reject)
  });
}