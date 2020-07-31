import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./assetChangeWarningModal.scss";

type WarningModalProps = {
  show: boolean;
  proceed: Function;
  cancel: Function;
};

const AssetChangeWarningModal = ({
  show,
  proceed,
  cancel,
}: WarningModalProps) => {
  return (
    <Modal
      show={show}
      centered
      style={{ backgroundColor: "rgba(22, 88, 124, 0.36)" }}
      className = "warning-modal"
    >
      <Modal.Header className="d-flex flex-row justify-content-center py-4">
        <div className="text-2xl font-medium text-center">Hold Up</div>
      </Modal.Header>
      <Modal.Body className="modal-body text-center py-5 m-auto">
        <div className="mb-5 opacity-80">
          You’re about to change your lending asset. If you do so, you will have
          to submit another Approve Transaction resulting in another gas fee.
          Are you sure you want to proceed?
        </div>
        <div className="d-flex flex-row justify-content-center">
          <Button
            onClick={() => {
              cancel();
            }}
            style={{ backgroundColor: "#FC5A5A" }}
            className="modal-button py-2 mx-3 text-lg"
            variant="danger"
          >
            Exit
          </Button>
          <Button
            onClick={() => {
              proceed();
            }}
            className="modal-button py-2 mx-3 text-lg"
            variant="success"
            style={{ backgroundColor: "#82C43C" }}
          >
            Yes
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AssetChangeWarningModal;
