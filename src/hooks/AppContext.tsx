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
import FetchTokenData from "../models/FetchTokenData";

const setAddress = async (state: AppContextState, updateAppState: Function) => {
  const { web3State } = state;
  const accounts = await web3State.web3.eth.getAccounts();
  web3State.address = accounts[0];
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
  web3State.blockNumber = blockNumber;
  updateAppState((st: AppContextState) => {
    return { ...st, web3State };
  });
  const subscription = web3State.web3.eth
    .subscribe("newBlockHeaders", function (error: any, result: any) {
      if (!error) {
        return;
      }
      console.error(error);
    })
    .on("connected", function (subscriptionId: any) {})
    .on("data", function (blockHeader: any) {
      web3State.blockNumber = blockHeader.number;
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
  console.log("merging");
  const networkId = await state.web3State.web3.eth.getChainId();

  if (Number(networkId) !== 1 && Number(networkId) !== 3) {
    const teller = AppContextDefault.state.teller;
    updateAppState((st: AppContextState) => ({
      ...st,
      teller,
    }));
  } else {
    try {
      const teller = await signInContracts(state.web3State, state.teller);
      updateAppState((st: AppContextState) => ({
        ...st,
        teller,
      }));
    } catch (e) {
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
  console.log("merged");
};

const getTokenData = async (
  state: AppContextState,
  updateAppState: Function
) => {
  try {
    if (state.tokenData !== null) return;
    const tokenData = await FetchTokenData();
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
    console.log(state.teller);
    setUpdates(state, updateAppState);
    console.log(state.teller);
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
