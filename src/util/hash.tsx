import { keccak256 } from 'ethereumjs-util';
import { rawEncode } from 'ethereumjs-abi';
import { _nonce } from './nonce';
import { BorrowRequest } from '../context/types';
import { AppContext, BaseTokens, TellerTokens } from '../context/app';
import { useContext } from 'react';
import { App } from 'react-bootstrap-icons';

const loansConsensusAddress = '0x3282B6468ABc25033e2ecF38C1E7c8eA2C8B4Fae';

let loansInstance: string;

export type PHashRequest = {
    consensusAddress: string;
    borrowedAsset: string;
    collateralAsset: string;
    requestNonce: string;
    /**
     * Requested loan size in stablecoin dollars * 1e6
     */
    requestedLoanSize: string;
    /**
     * Loan term length in seconds
     */
    loanTermLength: string;
    ethereumWallet: string;
    requestTime: string;
};

export type RHashRequest = Buffer;

export function hashRequest(
    borrowRequest: BorrowRequest,
    loansInstanceAddress: string,
) {
    loansInstance = loansInstanceAddress;
    const hash =  _hashRequest({
        borrowedAsset: borrowRequest.lendWith,
        collateralAsset: borrowRequest.collateralWith,
        consensusAddress: loansConsensusAddress,
        ethereumWallet: borrowRequest.borrowerAddress,
        loanTermLength: borrowRequest.loanTerm.toString(),
        requestNonce: borrowRequest.requestNonce.toString(),
        requestTime: borrowRequest.requestTime.toString(),
        requestedLoanSize: borrowRequest.loanSize.toString()
    });
    return hash;
}

export function _hashRequest({
    borrowedAsset,
    collateralAsset,
    consensusAddress,
    ethereumWallet,
    loanTermLength,
    requestNonce,
    requestTime,
    requestedLoanSize
}: PHashRequest) : RHashRequest {
    const fields = [
        'address', // caller
        'address', // borrower
        'address', // recipient
        'address', // consensusAddress
        'uint256', // requestNonce
        'uint256', // loan amount
        'uint256', // duration
        'uint256', // requestTime
        'uint256', // chain ID
    ];

    const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

    const values = [
        loansInstance,
        ethereumWallet,
        NULL_ADDRESS,
        consensusAddress,
        requestNonce,
        requestedLoanSize,
        loanTermLength,
        requestTime,
        4
    ];

    return hash(fields, values);
};

/**
 * Encodes values then returns a Keccak-256 hash of the result.
 * @param {Array} types - list of types
 * @param {Array} values - list of values to encode
 * @returns {Buffer} keccak-256 hash
 */
// eslint-disable-next-line
export const hash = (types: string[], values: any[]): Buffer => {
    return keccak256(rawEncode(types, values));
};