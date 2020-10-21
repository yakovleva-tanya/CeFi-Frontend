/**
 * Provides an app context hook for general application data.
 *
 * This context is a custom hook that exposes useState and it's effectful updater.
 * @namespace AppContextHook
 * @category ReactHooks
 */

import * as React from "react";
import { AppContextDefault, AppContextState } from "./../context/app";

import signInContracts from "./../actions/signInContracts";
import { FetchTokenData } from "../models/FetchTokenData";

const setAddress = async (state: AppContextState, updateAppState: Function) => {
  const { web3State } = state;
  const oldAddress = web3State.address;
  const accounts = await web3State.web3.eth.getAccounts();
  const newAddress = accounts[0];
  if (oldAddress.toLowerCase() === newAddress.toLowerCase()) {
    return;
  }
  web3State.address = newAddress;
  console.log("address updated: ", newAddress);
  updateAppState((st: AppContextState) => {
    return { ...st, web3State };
  });
};

const setBlockNumber = async (
  state: AppContextState,
  updateAppState: Function
) => {
  const { web3State } = state;
  if (web3State.network === "unknown") return;
  const blockNumber = await web3State.web3.eth.getBlockNumber();
  if (web3State.blockNumber !== blockNumber) {
    web3State.blockNumber = blockNumber;
    console.log("block number set: ", blockNumber);
    updateAppState((st: AppContextState) => {
      return { ...st, web3State };
    });
  }
  const subscription = web3State.web3.eth
    .subscribe("newBlockHeaders", function (error: any, result: any) {
      if (!error) {
        return;
      }
      console.error(error);
    })
    .on("connected", function (subscriptionId: any) {})
    .on("data", function (blockHeader: any) {
      if (web3State.blockNumber >= blockHeader.number) return;
      web3State.blockNumber = blockHeader.number;
      console.log("block number updated:", blockHeader.number);
      updateAppState((st: AppContextState) => {
        return { ...st, web3State };
      });
    })
    .on("error", console.error);
};

const mergeSignInContracts = async (
  state: AppContextState,
  updateAppState: Function
) => {
  const networkId = await state.web3State.web3.eth.getChainId();

  if (networkId !== 1 && networkId !== 4) {
    const teller = AppContextDefault.state.teller;
    console.log("Detected unsupported network. Netowrk ID: ", networkId);
    updateAppState((st: AppContextState) => ({
      ...st,
      teller,
    }));
  } else {
    try {
      const teller = await signInContracts(state.web3State, state.teller);
      console.log("teller contracts set");
      updateAppState((st: AppContextState) => ({
        ...st,
        teller,
      }));
    } catch (e) {
      console.log(e);
      updateAppState((st: AppContextState) => {
        const errorModal = {
          show: true,
          message:
            "An error occurred connecting to Teller contracts. Please try again.",
          title: "Error",
        };
        return { ...st, errorModal };
      });
    }
  }
};

const getTokenData = async (
  state: AppContextState,
  updateAppState: Function
) => {
  try {
    if (state.tokenData !== null) return;
    const tokenData = await FetchTokenData();
    console.log("token data updated");
    updateAppState((st: AppContextState) => {
      return { ...st, tokenData };
    });
  } catch (err) {
    console.log(err);
  }
};

const setUpdates = async (state: AppContextState, updateAppState: Function) => {
  await setAddress(state, updateAppState);
  await mergeSignInContracts(state, updateAppState);
  await setBlockNumber(state, updateAppState);
};

// const getCircularReplacer = () => {
//   const seen = new WeakSet();
//   return (key: any, value: any) => {
//     if (typeof value === "object" && value !== null) {
//       if (seen.has(value)) {
//         return;
//       }
//       seen.add(value);
//     }
//     return value;
//   };
// };

/**
 * Implements the app context hook.
 * @function useAppContext
 * @memberof AppContextHook
 */

export default function useAppContext() {
  // const stored = JSON.parse(localStorage.getItem("storedState"));
  // const [state, updateAppState] = React.useState(
  //   stored || AppContextDefault.state
  // );
  const [state, updateAppState] = React.useState(AppContextDefault.state);
  React.useEffect(() => {
    if (!state.web3State.network) return;
    if (!state.web3State.web3) return;
    setUpdates(state, updateAppState);
  }, [state.web3State?.network, state.web3State.address]);

  React.useEffect(() => {
    getTokenData(state, updateAppState);
  }, []);

  // localStorage.setItem(
  //   "storedState",
  //   JSON.stringify(state, getCircularReplacer())
  // );

  return [state, updateAppState];
}
