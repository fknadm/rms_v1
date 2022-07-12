import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import Hero from "../components/Hero";
import Content from "../components/Content";
import MainOrder from "../components/MainOrder";

import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalConfirm from "../components/ModalConfrim";

import "../App.css"

const Bar = (something) => {
  document.body.style.overflow = "scroll"

  console.log(something.prop, 'app>kitchen')

  const [dataState, setDataState] = useState([]);
  const [show, setShow] = useState(false)
  const [focus, setFocus] = useState([])

  useEffect(() => {
  }, []); 

  let history = useHistory()
  let location = useLocation()
  const { user } = useAuth0();


  const sprop = {
    type: "drink",
    order:"pending"

  }


  return (

    <Fragment>
             {show === true ? <ModalConfirm setShow={setShow} data={focus}/> : ''}
      <MainOrder data2={sprop} setFocus={setFocus} setShow={setShow}  data={something.prop} />
    </Fragment>
  )
};

export default withAuthenticationRequired(Bar, {
  onRedirecting: () => <Loading />,
});
