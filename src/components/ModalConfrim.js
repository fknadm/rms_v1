import React, { useState, useEffect } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import newlogo from "../assets/fblog.png"
import "../App.css"
import { singlePut, remOrder } from "../utils/fetch";
import Loading from "./Loading";


import cfm from "../assets/cfm.svg"

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

const ModalConfirm = (from) => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState([]);
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
      document.body.style.overflow = "hidden"
  },[]);

  console.log(from.data, 'here')
  console.log(isLoading,'LOADINGSTATE')

  const fetchId = (data) => {
    if (from.setIsOpen) {
      singlePut(data).then(res => {setLoading(false);from.setShow(false);from.setIsOpen(false)})
    }
    else if (!from.setIsOpen) {
      singlePut(data).then(res => {setLoading(false);from.setShow(false)})
    }
  }

  const markPaid = (data) => {
    if (from.setIsOpen) {
      remOrder(data).then(res => {setLoading(false);from.setShow(false);from.setIsOpen(false)})
    }
    else if (!from.setIsOpen) {
      remOrder(data).then(res => {setLoading(false);from.setShow(false)})
    }
  }

  if (isOpen === true) {
    console.log('OPEN!')
  }
  if (isOpen === false) {
    console.log('CLOSE')

  }
  console.log(current,'current test')

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return (
    <>
    {isLoading ? <Loading />:''}
    {from.data.type !== 'cashier' ? <><div className="modalConfirm">
      </div>
      <div className="modalInner">
        <div className="modalTotal">
          <div>
            <img className="icon_img" src={cfm} />
          </div>
          <h2>Confirm item: <b style={{textTransform:"uppercase"}}>{from.data.item}</b> <br/>from order {from.data.txid} for <br/><b style={{textTransform:"uppercase"}}>TABLE NO. {from.data.table}</b> As <p style={from.data.status === 'ready' ? { color: "#ffffff",backgroundColor:"#534acb",padding:"2px 5px",width:"30%",margin:"15px auto" } : { color: "red" }}>{from.data.status}</p></h2>

        </div>
        <div className="modalButtons">
          <button className="btn-modal ready" onClick={() => { fetchId(from.data);setLoading(true) }}>Confirm</button><button className="btn-modal cancel" onClick={() => { from.setShow(false) }}>Cancel</button>
        </div>
      </div></> : 
      <>
      <div className="modalConfirm">
      </div>
      <div className="modalInner">
        <div className="modalTotal">
          <div>
            <img className="icon_img" src={cfm} />
          </div>
          <h2>Confirm order {from.data.txid} for <br/><b style={{textTransform:"uppercase"}}>TABLE NO. {from.data.table}</b> As <p style={from.data.status === 'ready' ? { color: "#ffffff",backgroundColor:"#534acb",padding:"2px 5px",width:"30%",margin:"15px auto" } : { color: "red" }}>{from.data.status}</p></h2>

        </div>
        <div className="modalButtons">
          <button className="btn-modal ready" onClick={() => { markPaid(from.data);setLoading(true) }}>Confirm</button><button className="btn-modal cancel" onClick={() => { from.setShow(false) }}>Cancel</button>
        </div>
      </div>
      </>
      }
      

    </>
  );
};

export default ModalConfirm; 