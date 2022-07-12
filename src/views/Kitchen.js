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
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getFirestore, collection } from 'firebase/firestore';

import "../App.css"

const Kitchen = (something) => {
  document.body.style.overflow = "scroll"
  console.log(something.prop, 'app>kitchen')
  const [show, setShow] = useState(false)
  const [focus, setFocus] = useState([])

  useEffect(() => {
  }, []); 

  let history = useHistory()
  let location = useLocation()
  const { user } = useAuth0();


  const sprop = {
    type: "food",
    order:"pending"

  }



  return (

    <Fragment>
       {show === true ? <ModalConfirm setShow={setShow} data={focus}/> : ''}
      <MainOrder data2={sprop} data={something.prop} setFocus={setFocus} setShow={setShow}/>
    </Fragment>
  )
};

export default withAuthenticationRequired(Kitchen, {
  onRedirecting: () => <Loading />,
});
