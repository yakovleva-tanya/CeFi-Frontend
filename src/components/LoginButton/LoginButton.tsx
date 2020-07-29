import React, {useContext} from "react";
import { AppContext, AppContextState } from "../../context/app";

function truncate(n: number, useWordBoundary: boolean) {
  if (this.length <= n) {
    return this;
  }
  const subString = this.substr(0, n - 1);
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "..."
  );
}

const LoginButton = () => {
  const { state, updateAppState } = useContext(AppContext);
  const loggedIn = state.web3State?.address || "";
  const toggleModal = (show: boolean) => updateAppState((st: AppContextState) => ({ ...st, loginModal: { show } }));

  return (
    <span>
      {!loggedIn ? (
        <a
          className="menu-button login-button text-lg py-3 px-4"
          onClick={() => toggleModal(true)}
        >
          Connect Wallet
        </a>
      ) : (
          <div
            className="menu-button login-button text-lg py-3 px-4"
          >
            {truncate.apply(loggedIn, [10])}
          </div>
        )}
    </span>
  );
}

export default LoginButton;
