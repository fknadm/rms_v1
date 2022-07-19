import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import Hero from "../components/Hero";
import Content from "../components/Content";
import MainOrder from "../components/MainOrder";

import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useLocation, useHistory } from "react-router-dom";
import ModalConfirm from "../components/ModalConfrim";
import Tables from "../components/Tables";


const Cashier = (something) => {
  document.body.style.overflow = "scroll"
  console.log(something.prop, 'app>kitchen')

  const [show, setShow] = useState(false)
  const [focus, setFocus] = useState([])
  const [view, setView] = useState('pending')

  useEffect(() => {
  }, []);

  const sprop = {
    type: "all",
    order: "all",
  }

  const sprop2 = {
    type: "all",
    page:"cashier"
  }

  return (

    <Fragment>
      <div className="command_row">
      <button className="header_button pending" onClick={() => setView('pending')}>Pending Orders</button>
        <button className="header_button complete" onClick={() => setView('complete')}>Complete Orders</button>
        <button className="header_button tableb" onClick={() => setView('table')}>Tables</button>

      </div>
      <div className="bounding-container" style={{ display: "flex" }}>
        <div>
          {show === true ? <ModalConfirm setShow={setShow} data={focus} /> : ''}
          {view === 'pending' ? 
          <> 
          <h5>Pending</h5>
            <MainOrder style={{ width: "50%" }} data2={sprop2} setShow={setShow} setFocus={setFocus} data={something.prop} />
            </>  
            :
             view === 'complete' ? 
             <>
             <h5>Complete</h5>
             <MainOrder style={{ width: "50%" }} data2={sprop} setShow={setShow} setFocus={setFocus} data={something.prop} />
             </>
             :
             view === 'table' ?
             <>
             <Tables data={something.prop}/>
             </>
             :
             ''}
        </div>

      </div>

    </Fragment>
  )
};

export default withAuthenticationRequired(Cashier, {
  onRedirecting: () => <Loading />,
});
