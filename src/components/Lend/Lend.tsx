import React, {useState, useContext} from "react";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'
import './lend.scss';

import Card from "../UI/Card";
import BR from "../UI/BR";
import Metric from '../UI/Metric';
import { Check } from 'react-bootstrap-icons';
import { AppContext, AppContextState } from "../../context/app";


const Lend = () => {
  const { state, updateAppState } = useContext(AppContext);
  const loggedIn = state.web3State?.address || "";

  const [currency, setCurrency] = useState('DAI');
  const toggleLoginModal = (show: boolean) => updateAppState((st: AppContextState) => ({ ...st, loginModal: { show } }));
  const handleSelect = (eventKey: any, e?: React.SyntheticEvent<{}>) => {
    setCurrency(eventKey);
  }

  return (
    <div className="cards-container">
      <Card className="flex-2 text-center align-items-center" title="Lend">
        <div className="my-2">
          <div className="text-5xl font-medium ">$0.00</div>
          <div className="text-lightest-gray text-lg">0 DAI</div>
        </div>
        <div className="table border-thin my-4">
          <div className="d-flex flex-row justify-content-between p-3 m-x-auto">
            <div className="p-1">Lend With</div>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="toggle" className="dropdown font-medium p-1 text-gray" >
              {`${currency}   `}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="DAI" onSelect={handleSelect}>DAI</Dropdown.Item>
                <Dropdown.Item eventKey="USDT" onSelect={handleSelect}>USDT</Dropdown.Item>
                <Dropdown.Item eventKey="USDC" onSelect={handleSelect}>USDC</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <BR />
          <div className="d-flex flex-row justify-content-between p-3">
            <div className="p-1">Approve</div>
            <div className = "d-flex flex-row align-items-center">
              <div className={`py-1 px-3 border-thin text-lightest-gray ${loggedIn? "pointer" : "disabled"}`}>Submit</div>
              <Check className="text-lightest-gray text-lg ml-2" size={24}/>
            </div>
          </div>
        </div>
        {!loggedIn ? <Button className="py-3 px-4 mt-2 text-lg " variant="primary" onClick={() => toggleLoginModal(true)}> Connect Wallet </Button> : <Button className="py-3 px-4 mt-2 text-lg " variant="primary" > Supply </Button>}
      </Card>
      <Card className='flex-1' title="Metrics">
        <Metric title="Supply APY" value="8.40%" />
        <Metric title="Price - DAI" value="$1.01" />
        <Metric title="Wallet" value="-" />
      </Card>
    </div>
  )
}
export default Lend;


