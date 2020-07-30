
import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

type WarningModalProps = {
  show: boolean,
  proceed: Function,
  cancel: Function
};

const AssetChangeWarningModal = ({ show, proceed, cancel }: WarningModalProps) => {
  return (
    <Modal show={show} centered style={{ backgroundColor: 'rgba(22, 88, 124, 0.36)' }}>
      <Modal.Body className="text-center p-4">
        <div className="text-2xl mb-2 font-medium">Hold Up</div>
        <div className='my-3'>You’re about to change your lending asset. If you do so, you will have to submit another Approve Transaction resulting in another gas fee. Are you sure you want to proceed?</div>
        <div className=" d-flex flex-row justify-content-center ">
          <Button onClick={() => { cancel() }} style={{ backgroundColor: '#FC5A5A' }} className="py-2 px-3 m-2 text-lg" variant="danger">Exit</Button>
          <Button onClick={() => { proceed() }} className="py-2 px-3 m-2 text-lg" variant="success" style={{ backgroundColor: '#82C43C' }}>Yes</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default AssetChangeWarningModal;
