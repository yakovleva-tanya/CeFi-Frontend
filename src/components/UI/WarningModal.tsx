import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./WarningModal.scss";

type WarningModalProps = {
  show: boolean;
  proceed: Function | null;
  cancel: Function | null;
  text: string;
  header?: string;
  content?: React.ReactNode | null;
};

const WarningModal = ({
  show,
  proceed,
  cancel,
  text,
  header = "Hold Up",
  content = null,
}: WarningModalProps) => {
  return (
    <Modal
      show={show}
      centered
      style={{ backgroundColor: "rgba(22,88,124, 0.7)" }}
      className="warning-modal"
    >
      <Modal.Header className="d-flex flex-row justify-content-center py-4">
        <div className="text-2xl font-medium text-center">{header}</div>
      </Modal.Header>
      <Modal.Body className="modal-body text-center py-5 m-auto">
        <div className="mb-5 opacity-80">{text}</div>
        {content}
        <div className="d-flex flex-row justify-content-center">
          {cancel && (
            <Button
              onClick={() => {
                cancel();
              }}
              style={{ backgroundColor: "#FC5A5A" }}
              className="modal-button py-2 mx-3 text-lg"
              variant="danger"
            >
              Cancel
            </Button>
          )}
          {proceed && (
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
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WarningModal;
