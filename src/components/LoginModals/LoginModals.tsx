import React, {useContext} from "react";
import Modal from 'react-bootstrap/Modal';
import { Web3Connector } from '../LoginWeb3';
import { AppContext, AppContextState } from "../../context/app";

const LoginModals = () => {
  const { state, updateAppState } = useContext(AppContext);
  const errors = state.errorModal;
  const showLoginModal = state.loginModal.show;
  const toggleErrorModal = (show: boolean) => updateAppState((st: AppContextState) => ({ ...st, errorModal: { show } }));
  const toggleLoginModal = (show: boolean) => updateAppState((st: AppContextState) => ({ ...st, loginModal: { show } }));

  return (
    <div>
      <Modal show={showLoginModal} onHide={() => toggleLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login with an Ethereum account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Web3Connector close={toggleLoginModal} />
        </Modal.Body>
      </Modal>
      <Modal centered={true} show={errors.show} onHide={() => toggleErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{errors.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errors.message}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default LoginModals;
