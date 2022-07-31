import React from 'react'
import {   useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectCustomer } from '../plahim/customerSlice';
import { selectChosenFlight } from '../plahim/flightsSlice';
import { selectUser } from '../plahim/userSlice';

const TicketFinal = () => {
    const nav =useNavigate()
    const flight = useSelector(selectChosenFlight)
    const user = useSelector(selectUser)
    const customer = useSelector(selectCustomer)

  const createTicket = async ()=>{
    let token = localStorage.getItem('token')
     let ticket = await fetch('http://127.0.0.1:8000/tickets/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:"Bearer "+String(token)
        },
    body:JSON.stringify({
      flight_id:flight.id,
      customer_id: customer.id
   })});
   let response = await ticket.json();
   if(response.message === 'CREATED'){
    nav('/myTickets')
   }else{
    alert(response.message)
    nav('/')
   }
  };
    
    
  return (
    <div className='ticketFinal'>
      <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
<div className="wrapper wrapper--w790">
  <div className="card card-5">
      <div className="card-heading">
          <h2 className="title">Book Flight 1 <span style={{color:'green'}}>2</span></h2>
      </div>
      <div className="card-body" style={{background:'black'}}>                  
      <div className="form-row m-b-55">
                  <div className="name" style={{color:'white'}}>Flight :</div>
                  <div className="value">
                      <div className="row row-refine">
                          <div className="col-9">
                              <div className="input-group-desc">
                                  <input className="input--style-5" type="button" disabled={true} id="phone" style={{background:'black',color:'green',paddingLeft: '14px'}} defaultValue={flight.id}></input>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="form-row m-b-55">
                  <div className="name" style={{color:'white'}}>From :</div>
                  <div className="value">
                      <div className="row row-refine">
                          <div className="col-9">
                              <div className="input-group-desc">
                                  <input className="input--style-5" type="button" disabled={true} id="phone" style={{background:'black',color:'green',paddingLeft: '14px'}} defaultValue={flight.from}></input>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="form-row m-b-55">
                  <div className="name" style={{color:'white'}}>To :</div>
                  <div className="value">
                      <div className="row row-refine">
                          <div className="col-9">
                              <div className="input-group-desc">
                                  <input className="input--style-5" type="button" disabled={true} id="phone" style={{background:'black',color:'green',paddingLeft: '14px'}} defaultValue={flight.too}></input>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="form-row m-b-55">
                  <div className="name" style={{color:'white'}}>Leave :</div>
                  <div className="value">
                      <div className="row row-refine">
                          <div className="col-9">
                              <div className="input-group-desc">
                                  <p className="input--style-5" style={{background:'black',color:'green',paddingLeft: '14px'}}>{flight.dep_date} {'>>'} {flight.arrival_date}</p>
                                  <p className="input--style-5" style={{background:'black',color:'green',paddingLeft: '14px'}}>{flight.dep_time} {'>>'} {flight.arrival_time}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="form-row m-b-55">
                  <div className="name" style={{color:'white'}}>Customer :</div>
                  <div className="value" style={{background: 'white',borderwidth:3,borderRadius:10,paddingLeft:10}}>
                      <p style={{color:'black'}}>Customer ID : <span style={{color:'grey'}}>{customer.id}</span></p>
                      <p style={{color:'black'}}>Name : <span style={{color:'grey'}}>{customer.first_name +' '+customer.last_name}</span></p>
                      <p style={{color:'black'}}>Email : <Link className='link' to='/contact'>{user.email}</Link></p>
                      <p style={{color:'black'}}>Credit Card: <span style={{color:'grey'}} >{customer.credit}</span></p>
                  </div>
              </div>
              <div>
                  <button className="btn btn-outline-success" onClick={()=>createTicket()}>Confirm</button>
              </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default TicketFinal