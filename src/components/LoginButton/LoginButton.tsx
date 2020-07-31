import React, { useContext } from "react";
import { AppContext, AppContextState } from "../../context/app";

function truncate(n: number) {
  const length = this.length;
  if (length <= n) {
    return this;
  }
  return `${this.substr(0, n - 1)}...${this.substr(length - 4, length)}`;
}

const LoginButton = () => {
  const { state, updateAppState } = useContext(AppContext);
  const loggedIn = state.web3State?.address || "";
  const toggleModal = (show: boolean) =>
    updateAppState((st: AppContextState) => ({ ...st, loginModal: { show } }));

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
        <div className="menu-button login-button text-lg py-3 px-4">
          {truncate.apply(loggedIn, [6])}
        </div>
      )}
    </span>
  );
};

export default LoginButton;
