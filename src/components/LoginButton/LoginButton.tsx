import React, { useContext } from "react";
import { AppContext, AppContextState, Web3Type, Web3State } from "./../../context/app";
import Web3 from 'web3';
import Onboard from 'bnc-onboard';
import { BlockNativeOptions } from './../../util/constants';

function truncate(n: number) {
  const length = this.length;
  if (length <= n) {
    return this;
  }
  return `${this.substr(0, n - 1)}...${this.substr(length - 4, length)}`;
}

export async function web3FromProvider(updateAppState: Function) {
  const onboard = Onboard({
    ...BlockNativeOptions,
    subscriptions: {
      wallet: async (wallet: any) => {
        const web3 = new Web3(wallet.provider);
        const web3State = {
          type: Web3Type.BlockNative,
          web3,
          onboard
        } as Web3State;
        updateAppState((st: AppContextState) => {
          return { ...st, web3State }
        });
      }
    }
  });
  await onboard.walletSelect();
  await onboard.walletCheck();
}

const LoginButton = () => {
  const { state, updateAppState } = useContext(AppContext);
  const loggedIn = state.web3State?.address || "";

  return (
    <span>
      {!loggedIn ? (
        <a
          className="menu-button login-button text-lg py-3 px-4"
          onClick={() => web3FromProvider(updateAppState)}
        >
          Connect Wallet
        </a>
      ) : (
        <div className="menu-button login-button text-lg py-3 px-4">
          {truncate.apply(loggedIn, [6])}
        </div>
      )}
    </span>
  );
};

export default LoginButton;
