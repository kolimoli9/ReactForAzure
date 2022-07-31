import React, { useState } from 'react'
const Register = () => {
   const [staffRequested, setstaffRequested] = useState('False')
  const register =async()=>{
    if(document.getElementById('password').value===document.getElementById('password2').value){ 
    let rgisteration = await fetch('http://127.0.0.1:8000/register/',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
          first_name:document.getElementById('first_name').value,
          last_name:document.getElementById('last_name').value,
          username:document.getElementById('username').value,
          password:document.getElementById('password').value,
          email:document.getElementById('email').value,
          phone:document.getElementById('phone').value,
          is_staff: 'False',
          staff_requested:staffRequested
       })});
      let response = await rgisteration.json();
      console.log(response)
      alert(response.message);
      window.location.href='login';
    }else{
      alert('One of the passwords wasnt a match for the other.')
     }
};
 
  return (
    <div className='register'>
    <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
        <div className="wrapper wrapper--w790">
            <div className="card card-5">
                <div className="card-heading">
                    <h2 className="title">Registration</h2>
                </div>
                <div className="card-body">
                    <div>
                        <div className="form-row m-b-55">
                            <div className="name">Name</div>
                            <div className="value">
                                <div className="row row-space">
                                    <div className="col-2">
                                        <div className="input-group-desc">
                                            <input className="input--style-5" type="text" id="first_name"></input>
                                            <label className="label--desc" >first name</label>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="input-group-desc">
                                            <input className="input--style-5" type="text" id="last_name"></input>
                                            <label className="label--desc">last name</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="name">Username</div>
                            <div className="value">
                                <div className="input-group">
                                    <input className="input--style-5" type="text" id="username" ></input>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="name">Password</div>
                            <div className="value">
                                <div className="input-group">
                                    <input className="input--style-5" type="password" id="password" ></input>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="name">Email</div>
                            <div className="value">
                                <div className="input-group">
                                    <input className="input--style-5" type="email" id="email"></input>
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
                        <div className="form-row">
                            <div className="name">Password Agian *</div>
                            <div className="value">
                                <div className="input-group">
                                <div id="liveAlertPlaceholder"></div>
                                <input className="input--style-5" type="password" id="password2"></input>
                                </div>
                            </div>
                        </div>
                        <div className="form-row p-t-20">
                            <label className="label label--block">What are your purpose on this site?</label>
                            <div className="p-t-15">
                                <label className="radio-container m-r-55">Customer
                                    <input type="radio"  name="exist" onClick={()=>setstaffRequested('False')}></input>
                                    <span className="checkmark"></span>
                                </label>
                                <label className="radio-container">Airline
                                    <input type="radio" name="exist" onClick={()=>setstaffRequested('True')}></input>
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn--radius-2 btn--red" onClick={()=>register()}>register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
  )
}

export default Register