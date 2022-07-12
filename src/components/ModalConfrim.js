import React, { useState, useEffect } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import newlogo from "../assets/fblog.png"
import "../App.css"

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

  useEffect(() => {
      document.body.style.overflow = "hidden"
  },[]);


  if (isOpen === true) {
    console.log('OPEN!')
  }
  if (isOpen === false) {
    console.log('CLOSE')

  }

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return (
    <>
      <div className="modalConfirm">
      </div>
      <div className="modalInner">
        <div className="modalTotal">
          <div>
            <img className="icon_img" src={cfm} />
          </div>
          <h2>Confirm item: <b style={{textTransform:"uppercase"}}>{from.data.item}</b> <br/>from order {from.data.txid} for <br/><b style={{textTransform:"uppercase"}}>TABLE NO. {from.data.table}</b> As <p style={from.data.status === 'ready' ? { color: "#ffffff",backgroundColor:"#534acb",padding:"2px 5px",width:"30%",margin:"15px auto" } : { color: "red" }}>{from.data.status}</p></h2>

        </div>
        <div className="modalButtons">
          <button className="btn-modal ready" onClick={() => { from.setShow(false) }}>Confirm</button><button className="btn-modal cancel" onClick={() => { from.setShow(false) }}>Cancel</button>
        </div>
      </div>

    </>
  );
};

export default ModalConfirm; 
