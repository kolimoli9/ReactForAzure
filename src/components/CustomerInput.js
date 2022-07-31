import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../plahim/userSlice'

const CustomerInput = () => {
   const user = useSelector(selectUser)
   const nav =useNavigate()

   const createCustomer=async()=>{
    let Customer =await fetch(`http://127.0.0.1:8000/customers/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    body:JSON.stringify({
        first_name:document.getElementById('first_name').value,
        last_name:document.getElementById('last_name').value,
        adress:document.getElementById('adress').value,
        phone:document.getElementById('phone').value,
        credit_num:document.getElementById('credit').value,
        user_id : user.id
    })});
    let response = await Customer.json();
    if(response.message ==='CREATED'){
         nav("ticketFinal")
    }else{
        alert(' Something went wrong ')
        nav('/')
     }
   };

    
  return (
    <div className='customerInfo'>
<div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
<div className="wrapper wrapper--w790">
  <div className="card card-5">
      <div className="card-heading">
          <h2 className="title">Book Flight <span style={{color:'green'}}>1</span> 2</h2>
      </div>
      <div className="card-body" style={{background:'black'}}>
          
              <div className="form-row m-b-55">
                  <div className="name">Name</div>
                  <div className="value">
                          <div className="form-row m-b-55">
                              <div className="input-group">
                                  <input className="input--style-5" type="text" id="first_name" defaultValue={user.first_name}></input>
                              </div>
                          </div>
                          <div className="form-row m-b-55">
                              <div className="input-group">
                                  <input className="input--style-5" type="text" id="last_name" defaultValue={user.last_name}></input>
                              </div>
                          </div>
                      </div>
                    </div>
              <div className="form-row">
                  <div className="name">Adress</div>
                  <div className="value">
                      <div className="input-group">
                          <input className="input--style-5" type="text" id="adress" placeholder='Country ,City , street..'></input>
                      </div>
                  </div>
              </div>
              <div className="form-row">
                  <div className="name">Credit Card</div>
                  <div className="value">
                      <div className="input-group">
                          <input className="input--style-5" type="password" id="credit" placeholder='**** **** **** ****'></input>
                      </div>
                  </div>
              </div>
              <div className="form-row">
                  <div className="name">Email</div>
                  <div className="value">
                      <div className="input-group">
                          <input className="input--style-5" type="email" id="email" defaultValue={user?(user.email):('')}></input>
                      </div>
                  </div>
              </div>
              <div className="form-row m-b-55">
                  <div className="name">Phone</div>
                  <div className="value">
                      <div className="row row-refine">
                          <div className="col-9">
                              <div className="input-group-desc">
                                  <input className="input--style-5" type="text" id="phone"></input>
                                  <label className="label--desc">Phone Number</label>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div>
                  <button className="btn btn--radius-2 btn--red" onClick={()=>createCustomer()}>Next</button>
              </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default CustomerInput