import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";

import Hero from "../components/Hero";
import Content from "../components/Content";
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


const Ordering = () => {
  const propa = {
    "datap": "Order your food & beverages here.",
    "datat": "The Hooks Menu"
  }
  return (
    <div>
    <Fragment>
      <NavBar />
      <Hero data={propa}/>
      <hr />
      <Footer />
    </Fragment>
    </div>
  )
};

export default Ordering;
