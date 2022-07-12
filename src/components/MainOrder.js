import React, { useState, useEffect } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import newlogo from "../assets/fblog.png"
import "../App.css"

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

const MainOrder = (from) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
  }, []);

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const toggle = () => setIsOpen(!isOpen);

  console.log(from.data2)
  const datatype = from.data2.order
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  console.log(from.data, 'app>kitchen>order')

  const dataArray = from.data

  console.log(datatype)

  const total_pending = dataArray.filter(obj => {
    if (datatype === 'pending') {
      return obj.status === 'pending'
    }

    if (datatype === 'all') {
      return obj.status === 'complete'

    }

    if (from.data2.pending === 'pending') {
      return obj.status === 'pending'
    }

  })

  const mappedOrders =

    total_pending.map(item => {

      const donefood = item.food.filter(obj => {
        return obj.status === 'ready'
      })

      const donebev = item.drink.filter(obj => {
        return obj.status === 'ready'
      })

      return (
        <div style={item.status === 'pending' ? { border: "5px solid #ff9191" } : item.status === 'complete' ? { border: "5px solid #73cbfa" } : {}} className="order_card" key={item.orderId}>
          <p style={{fontSize:"20px"}}><b>Order Number: </b>{item.orderId}</p>
          <p className="sticker">{item.table_no}</p>
          <div style={item.status === 'pending' ? { backgroundColor: "#ff9191" } : item.status === 'complete' ? { backgroundColor: "#d6e2ff" } : {}} className="order_card_header">
            <div className="left-right">
              <p><b>Table Number : </b>{item.table_no}</p>
              <p><b>Order Status : </b>{item.status}</p>
            </div>
            <div className="left-right">
              <p><b>Order Time : </b>{item.submitted}</p>
              <p><b>Elapsed Time : </b>{item.submitted}</p>
            </div>

          </div>

          <div className="order_card_body">
            {from.data2.type === 'food' ?
              <div className="food-row">
                <h5 className="cat-head">Food Items : {donefood.length + '/' + item.food.length
                }</h5>
                {item.food.map((food, i) => (
                  <div className="order_card_body_food_card" key={i}>
                    <div className="itemcard">
                      <div className="itemtitle"><p><b>{food.f_name}</b></p> <a style={food.status === 'pending' ? { backgroundColor: "yellow" } : food.status === 'late' ? { backgroundColor: "red" } : food.status === 'ready' ? { backgroundColor: "blue" } : food.status === 'sent' ? { backgroundColor: "green" } : ''} className="progress-ind">{food.status}</a> </div>
                      <div className="button-row">
                        <button onClick={() => { from.setShow(true); from.setFocus({ 'item': food.f_name, 'status': 'ready', txid: item.orderId, comms: food.comments, table: item.table_no }) }} className=" btn btn-success">Ready</button><button className="btn btn-next">Sent</button>
                      </div>
                    </div>



                    {food.comments ? <p className="comments"><b>Comments: </b>{food.comments}</p> : ''}

                  </div>
                ))}
              </div>
              : from.data2.type === 'drink' ?
                <div className="drink-row">
                  <h5 className="cat-head">Beverages : {donebev.length + '/' + item.drink.length
                  }</h5>
                  {
                    item.drink.map((drink, i) => (
                      <div className="order_card_body_food_card" key={i}>
                        <div className="itemcard">
                          <div className="itemtitle"><p><b>{drink.f_name}</b></p> <a style={drink.status === 'pending' ? { backgroundColor: "yellow" } : drink.status === 'late' ? { backgroundColor: "red" } : drink.status === 'ready' ? { backgroundColor: "blue" } : drink.status === 'sent' ? { backgroundColor: "green" } : ''} className="progress-ind">{drink.status}</a> </div>
                          <div className="button-row">
                            <button onClick={() => { from.setShow(true); from.setFocus({ 'item': drink.f_name, status: 'ready', txid: item.orderId, comms: drink.comments, table: item.table_no }) }} className=" btn btn-success">Ready</button><button className="btn btn-next">Sent</button>
                          </div>
                        </div>



                        {drink.comments ? <p className="comments"><b>Comments: </b>{drink.comments}</p> : ''}

                      </div>
                    ))}
                </div>
                : <><div className="food-row">
                  <h5 className="cat-head">Food Items : {donefood.length + '/' + item.food.length
                  }</h5>
                  {item.food.map((food, i) => (
                    <div className="order_card_body_food_card" key={i}>
                      <div className="itemcard">
                        <div className="itemtitle"><p><b>{food.f_name}</b></p> <a style={food.status === 'pending' ? { backgroundColor: "yellow" } : food.status === 'late' ? { backgroundColor: "red" } : food.status === 'ready' ? { backgroundColor: "blue" } : food.status === 'sent' ? { backgroundColor: "green" } : ''} className="progress-ind">{food.status}</a> </div>
                        <div className="button-row">
                          {item.status === 'pending' ? <><button onClick={() => { from.setShow(true); from.setFocus({ 'item': food.f_name, status: 'ready', txid: item.orderId, comms: food.comments, table: item.table_no }) }} className=" btn btn-success">Ready</button><button className="btn btn-next">Sent</button></> : <button>Delete</button>}
                        </div>
                      </div>



                      {food.comments ? <p className="comments"><b>Comments: </b>{food.comments}</p> : ''}

                    </div>
                  ))}
                </div>
                  <div className="drink-row">
                    <h5 className="cat-head">Beverages : {donebev.length + '/' + item.drink.length
                    }</h5>
                    {item.drink.map((drink, i) => (
                      <div className="order_card_body_food_card" key={i}>
                        <div className="itemcard">
                          <div className="itemtitle"><p><b>{drink.f_name}</b></p> <a style={drink.status === 'pending' ? { backgroundColor: "yellow" } : drink.status === 'late' ? { backgroundColor: "red" } : drink.status === 'ready' ? { backgroundColor: "blue" } : drink.status === 'sent' ? { backgroundColor: "green" } : ''} className="progress-ind">{drink.status}</a> </div>
                          <div className="button-row">
                            {item.status === 'pending' ? <><button onClick={() => { from.setShow(true); from.setFocus({ 'item': drink.f_name, status: 'ready', txid: item.orderId, comms: drink.comments, table: item.table_no }) }} className=" btn btn-success">Ready</button><button className="btn btn-next">Sent</button></> : <button>Delete</button>}
                          </div>
                        </div>



                        {drink.comments ? <p className="comments"><b>Comments: </b>{drink.comments}</p> : ''}

                      </div>
                    ))}
                  </div>
                </>


            }
          </div>

          <div className="order_card_footer">

          </div>
        </div>
      )
    })


  return (
    <div className="order_assort">
      {mappedOrders}

    </div>
  );
};

export default MainOrder; 
