import React, { useState, useEffect } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import newlogo from "../assets/fblog.png"
import "../App.css"
import Moment from 'react-moment';
import moment from 'moment';

const MainOrder = (from) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cFood, setcFood] = useState(false)

  useEffect(() => {
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const datatype = from.data2.order
  const dataArray = from.data
  const context = from.data2

  const ffilter = dataArray.filter(o => {
    return o.status === 'pending' || o.status === 'ready'
  })

  const fstatement = ffilter.map(x => x.food.every(x => x.status === 'ready'))
  const sstatement = ffilter.map(x => x.drink.every(x => x.status === 'ready'))

  const total_pending = dataArray.filter(obj => {

    if (context.page === "kitchen") {
      return obj.status === 'pending'
    }

    if (context.page === 'bar') {
      return obj.status === 'pending' || obj.status === 'ready'

    }

    if (datatype === 'all') {
      return obj.status === 'complete'
    }

    if (context.page === 'cashier') {
      return obj.status === 'pending' || obj.status === 'ready'
    }


  })

  const mappedOrders =

    total_pending.map(item => {

      const donefood = item.food.filter(obj => {
        return obj.status === 'sent'
      })

      const donebev = item.drink.filter(obj => {
        return obj.status === 'sent'
      })

      return (
        <div style={item.status === 'pending' ? { border: "5px solid #ff9191" } : item.status === 'complete' ? { border: "5px solid #2dab6a" } : item.status === 'ready' ? { border: "5px solid #6973ff" } : {}} className="order_card" key={item.orderId}>
          <p style={{ fontSize: "20px" }}><b>Order Number: </b>{item.orderId}</p>
          <p className="sticker">{item.table_no}</p>
          <div style={item.status === 'pending' ? { backgroundColor: "#ff9191" } : item.status === 'complete' ? { backgroundColor: "#69ffd2" } : item.status === 'ready' ? { backgroundColor: '#a0d1fa' } : {}} className="order_card_header">
            <div className="left-right">
              <p><b>Table Number : </b>{item.table_no}</p>
              <p><b>Order Status : </b>{item.status}</p>
            </div>
            <div className="left-right">
              <p><b>Order Time : </b>{moment(item.submitted).format("hh:mm")}</p>
              <p><b>Elapsed Time : </b><Moment date={item.submitted} format="hh:mm:ss" durationFromNow></Moment></p>
            </div>

          </div>

          {item.status === "complete" ? <button onClick={() => { from.setShow(true); from.setFocus({ status: 'ORDER PAID', txid: item.orderId, table: item.table_no, type: 'cashier', }) }} className="paid-order">ORDER PAID</button> : ''}

          <div className="order_card_body">

            {from.data2.type === 'food' ?

              <div className="food-row">
                <h5 className="cat-head">Food Items : {donefood.length + '/' + item.food.length
                }</h5>

                {item.food.map((food, i) => (
                          <div style={food.status === 'pending' ? { border: '3px solid #e0d553' } : food.status === 'ready' ? { border: '3px solid #534acb', backgroundColor: '#d4ebff' } : food.status === 'sent' ? { border: '3px solid #33ab65', backgroundColor: '#4fc480' } : {}} className="order_card_body_food_card" key={i}>
                          <div className="itemcard">
                      <div className="itemtitle"><p><b>{food.f_name}</b></p> <a style={food.status === 'pending' ? { backgroundColor: "yellow" } : food.status === 'late' ? { backgroundColor: "red",color:'#ffffff' } : food.status === 'ready' ? { backgroundColor: "blue",color:'#ffffff' } : food.status === 'sent' ? { backgroundColor: "green",color:'#ffffff' } : {}} className="progress-ind">{food.status}</a> </div>
                      <div className="button-row">
                        {food.status === 'pending' ? <button onClick={() => { from.setShow(true); from.setFocus({ 'item': food.f_name, status: 'ready', txid: item.orderId, comms: food.comments, table: item.table_no, itemid: food.tid, type: 'food' }) }} className=" btn btn-success">Ready</button> : ''}
                      </div>
                    </div>
                    {food.comments ? <p className="comments"><b>Comments: </b>{food.comments}</p> : ''}

                  </div>
                ))}

              </div>

              :

              from.data2.type === 'drink' ?
                <div className="drink-row">
                  <h5 className="cat-head">Beverages : {donebev.length + '/' + item.drink.length
                  }</h5>

                  {
                    item.drink.map((drink, i) => (
                      <div style={drink.status === 'pending' ? { border: '3px solid #e0d553' } : drink.status === 'ready' ? { border: '3px solid #534acb', backgroundColor: '#d4ebff' } : drink.status === 'sent' ? { border: '3px solid #33ab65', backgroundColor: '#4fc480' } : {}} className="order_card_body_food_card" key={i}>
                        <div className="itemcard">
                          <div className="itemtitle"><p><b>{drink.f_name}</b></p> <a style={drink.status === 'pending' ? { backgroundColor: "yellow" } : drink.status === 'late' ? { backgroundColor: "red" } : drink.status === 'ready' ? { backgroundColor: "blue",color:'#ffffff' } : drink.status === 'sent' ? { backgroundColor: "green",color:'#ffffff' } : {}} className="progress-ind">{drink.status}</a> </div>
                          <div className="button-row">
                            {drink.status === 'pending' ? <><button onClick={() => { from.setShow(true); from.setFocus({ 'item': drink.f_name, status: 'ready', txid: item.orderId, comms: drink.comments, table: item.table_no, itemid: drink.tid, type: 'drink' }) }} className=" btn btn-success">Ready</button><button onClick={() => { from.setShow(true); from.setFocus({ 'item': drink.f_name, status: 'sent', txid: item.orderId, comms: drink.comments, table: item.table_no, itemid: drink.tid, type: 'drink' }) }} className="btn btn-next">Sent</button></> : drink.status === 'ready' ? <button onClick={() => { from.setShow(true); from.setFocus({ 'item': drink.f_name, status: 'sent', txid: item.orderId, comms: drink.comments, table: item.table_no, itemid: drink.tid, type: 'drink' }) }} className="btn btn-next">Sent</button> : ''}
                          </div>
                        </div>
                        {drink.comments ? <p className="comments"><b>Comments: </b>{drink.comments}</p> : ''}

                      </div>
                    ))}
                </div>

                :

                from.data2.type === 'all' ?

                  <>
                    <div className="food-row">
                      <h5 className="cat-head">Food Items : {donefood.length + '/' + item.food.length
                      }</h5>
                      {item.food.map((food, i) => {

                        return (
                          <div style={food.status === 'pending' ? { border: '3px solid #e0d553' } : food.status === 'ready' ? { border: '3px solid #534acb', backgroundColor: '#d4ebff' } : food.status === 'sent' ? { border: '3px solid #33ab65', backgroundColor: '#4fc480' } : {}} className="order_card_body_food_card" key={i}>
                            <div className="itemcard">
                              <div className="itemtitle"><p><b>{food.f_name}</b></p> <a style={food.status === 'pending' ? { backgroundColor: "yellow" } : food.status === 'late' ? { backgroundColor: "red", color: '#ffffff' } : food.status === 'ready' ? { backgroundColor: "blue", color: '#ffffff' } : food.status === 'sent' ? { backgroundColor: "#2dab6a", color: '#ffffff' } : {}} className="progress-ind">{food.status}</a> </div>
                              <div className="button-row">
                                {food.status === 'pending' ? <><button onClick={() => { from.setShow(true); from.setFocus({ 'item': food.f_name, status: 'ready', txid: item.orderId, comms: food.comments, table: item.table_no, itemid: food.tid, type: 'food' }) }} className=" btn btn-success">Ready</button><button onClick={() => { from.setShow(true); from.setFocus({ 'item': food.f_name, status: 'sent', txid: item.orderId, comms: food.comments, table: item.table_no, itemid: food.tid, type: 'food' }) }} className="btn btn-next">Sent</button></> : food.status === 'ready' ? <button onClick={() => { from.setShow(true); from.setFocus({ 'item': food.f_name, status: 'sent', txid: item.orderId, comms: food.comments, table: item.table_no, itemid: food.tid, type: 'food' }) }} className="btn btn-next">Sent</button> : ''}
                              </div>
                            </div>



                            {food.comments ? <p className="comments"><b>Comments: </b>{food.comments}</p> : ''}

                          </div>
                        )
                      })}
                    </div>
                    <div className="drink-row">
                      <h5 className="cat-head">Beverages : {donebev.length + '/' + item.drink.length
                      }</h5>
                      {item.drink.map((drink, i) => (
                        <div style={drink.status === 'pending' ? { border: '3px solid #e0d553' } : drink.status === 'ready' ? { border: '3px solid #534acb', backgroundColor: '#d4ebff' } : drink.status === 'sent' ? { border: '3px solid #33ab65', backgroundColor: '#4fc480' } : {}} className="order_card_body_food_card" key={i}>
                          <div className="itemcard">
                            <div className="itemtitle"><p><b>{drink.f_name}</b></p> <a style={drink.status === 'pending' ? { backgroundColor: "yellow" } : drink.status === 'late' ? { backgroundColor: "red" } : drink.status === 'ready' ? { backgroundColor: "blue", color: '#ffffff' } : drink.status === 'sent' ? { backgroundColor: "#2dab6a", color: '#ffffff' } : {}} className="progress-ind">{drink.status}</a> </div>
                            <div className="button-row">
                              {drink.status === 'pending' ? <><button onClick={() => { from.setShow(true); from.setFocus({ 'item': drink.f_name, status: 'ready', txid: item.orderId, comms: drink.comments, table: item.table_no, itemid: drink.tid, type: 'drink' }) }} className=" btn btn-success">Ready</button><button onClick={() => { from.setShow(true); from.setFocus({ 'item': drink.f_name, status: 'sent', txid: item.orderId, comms: drink.comments, table: item.table_no, itemid: drink.tid, type: 'drink' }) }} className="btn btn-next">Sent</button></> : drink.status === 'ready' ? <button onClick={() => { from.setShow(true); from.setFocus({ 'item': drink.f_name, status: 'sent', txid: item.orderId, comms: drink.comments, table: item.table_no, itemid: drink.tid, type: 'drink' }) }} className="btn btn-next">Sent</button> : ''}
                            </div>
                          </div>



                          {drink.comments ? <p className="comments"><b>Comments: </b>{drink.comments}</p> : ''}

                        </div>
                      ))}
                    </div>
                  </>


                  : ''}
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
