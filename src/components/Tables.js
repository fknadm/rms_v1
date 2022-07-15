import React, { useState, useEffect, Fragment } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import newlogo from "../assets/fblog.png"
import "../App.css"
import MainOrder from "./MainOrder";
import exit from "../assets/exit.svg"
import ModalConfirm from "./ModalConfrim";

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

const Tables = (from) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selTable, setTable] = useState([])
  const [show, setShow] = useState(false)
  const [focus, setFocus] = useState([])



  useEffect(() => {
  }, []);

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const tablesetDefault = {
    tables: 25,
    setting: 'small'
  }

  const sprop = {
    type: "all",
    order: "all",


  }

  const sprop2 = {
    type: "all",
    pending: "pending"


  }

  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  console.log(from.data, 'app>kitchen>tables')

  const dataArray = from.data
    var tablelist = [];
    var tableOrders =[];
    dataArray.map(item => {tableOrders.push(item.table_no)})

    console.log(tableOrders)

    const checker = (c) => {
      return(
        tableOrders.includes(c)
      )
    }

    const showTable = (num) => {
      const selectedTable = dataArray.filter(tab => {
        return tab.table_no == num
      })
      setTable(selectedTable)
      toggleOpen()
    }

    const toggleOpen = () => {
      if (isOpen === false) {
          setIsOpen(true)
      }
      if (isOpen === true) {
        setIsOpen(false)
    }
    }

    console.log(selTable, 'seltable')

    const showOrder = () => {
      return (
        <>
       <div className="modalConfirm">
      </div>
      <div className="modalInner">
        <div className="modalTotal_2">
        {show === true ? <ModalConfirm setShow={setShow} data={focus} /> : ''}
          <div className="exitdiv">
            <img className="exitrow" onClick={() => {toggleOpen()}} src={exit}/>
          </div>
          {selTable.map(item => (
            <p>{item.table_no}</p>
          ))}
          <MainOrder setFocus={setFocus} setShow={setShow} data2={sprop} data={selTable}/>
          <MainOrder setFocus={setFocus} setShow={setShow} data2={sprop2} data={selTable}/>

        </div>
      </div>
        </>
      )
    }

  for (let i = 1; i < tablesetDefault.tables; i++) {  
  tablelist.push( 
  <div onClick={checker(i) ? () => {showTable(i)} : ''} style={checker(i) ? {backgroundColor:'#d96464',color:'#ffffff'} : {backgroundColor:'#e3e3e3'}} className="table-tile" key={i}>
    <p>{i}</p>
  </div>
  )
}


  return (
      <div className="tiles">
        {isOpen ? showOrder() : ''}
      {tablelist}
      </div>
  );
};

export default Tables; 
