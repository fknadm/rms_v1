import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import Hero from "../components/Hero";
import Content from "../components/Content";
import MainOrder from "../components/MainOrder";

import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useLocation, useHistory } from "react-router-dom";
import ModalConfirm from "../components/ModalConfrim";


const Cashier = (something) => {
  document.body.style.overflow = "scroll"
  console.log(something.prop, 'app>kitchen')

  const [show, setShow] = useState(false)
  const [focus, setFocus] = useState([])
  const [view, setView] = useState('pending')



  useEffect(() => {
  }, []);

  // const toggleView = () => {
  //   if (viewComplete) {
  //     setView(false)
  //   }
  //   else {
  //     setView(true)
  //   }
  // }



  let history = useHistory()
  let location = useLocation()
  const { user } = useAuth0();

  // const showHide = (dat) => {
  //   setShow(dat)
  //   console.log(show)
  // }


  const sprop = {
    type: "all",
    order: "all",


  }

  const sprop2 = {
    type: "all",
    pending: "pending"


  }

  const modalWin = () => {
    return (
      <div>
        <p>TEST MODAL</p>
      </div>
    )
  }




  return (

    <Fragment>
      <div>
        <button onClick={() => setView('complete')}>Show Complete Order</button> <button onClick={() => setView('pending')}>Show Pending Order</button>

      </div>
      <div className="bounding-container" style={{ display: "flex" }}>
        <div>
          {show === true ? <ModalConfirm setShow={setShow} data={focus} /> : ''}
          {view === 'pending' ? <> 
          <h5>Pending</h5>
            <MainOrder style={{ width: "50%" }} data2={sprop2} setShow={setShow} setFocus={setFocus} data={something.prop} />
            </>  :
             view === 'complete' ? 
             <>
             <h5>Complete</h5>
             <MainOrder style={{ width: "50%" }} data2={sprop} data={something.prop} />
             </>
             :
             view === 'table' ?
             <>
             Table
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
