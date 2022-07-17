import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Ordering from "./views/Ordering";
import Kitchen from "./views/Kitchen";
import Cashier from "./views/Cashier";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import NavBarInt from "./components/NavBarInternal";
import { globalFetch, singlePut } from "./utils/fetch";
import Bar from "./views/Bar";
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'
import Noti from "./components/Noti"
import noti from "./assets/bell.mp3"
import useSound from "use-sound"
import "./App.css";
import initFontAwesome from "./utils/initFontAwesome";

initFontAwesome();
firebase.initializeApp({
  apiKey: "AIzaSyDsvfUROgM0PD0maGPEY55N1MdQ-24CqyU",
  authDomain: "rms-deployment1.firebaseapp.com",
  projectId: "rms-deployment1",
  storageBucket: "rms-deployment1.appspot.com",
  messagingSenderId: "480608866435",
  appId: "1:480608866435:web:c93a1240826a1ffdcc4bb6",
  measurementId: "G-KHNN9NEN8F"
});

const firestore = firebase.firestore()

const messagesRef = firestore.collection('orders');
const query = messagesRef.orderBy('submitted')

const App = () => {
  const [loadlist] = useCollectionData(query, { idField: 'id' });
  const [mainState, setMainState] = useState([]);

  const bell = () => {
    const [play] = useSound(noti);
    useEffect(() => {
      play();
    });
  }


  useEffect(() => {
    if (loadlist) {
      console.log('succ')
      setMainState(loadlist)
    }

    if (!loadlist) {
      console.log('fail')
    }

  });

  return (
    <Router history={history}>
      <div id="app" className="">
        <Container className="">
          {bell()}
          <NavBarInt prop={mainState} />
          <Switch>
            <Route path="/kitchen" render={(prop) => <Kitchen prop={mainState} {...prop} />} />
            <Route path="/bar" render={(prop) => <Bar prop={mainState} {...prop} />} />
            <Route path="/" exact render={(prop) => <Cashier prop={mainState} {...prop} />} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App;
