import {React, useEffect } from 'react'
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setTheUser} from '../../plahim/userSlice'
import { setCustomer } from '../../plahim/customerSlice';
import { setFlights } from '../../plahim/flightsSlice';
import axios from 'axios';
const Layout=()=> { 
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(()=>{
    async function fetchData() {
      let request = await fetch("http://127.0.0.1:8000/getflights/");
      let response = await request.json();
      console.log(response)
      dispatch(setFlights((response)));
    }
     fetchData()},[dispatch])

        
  
  window.onload=()=>{
    let savedUser = localStorage.getItem('user')
    let savedCustomer = localStorage.getItem('customer')
    if(savedUser!=null){
        let signedIn = JSON.parse(savedUser)
        let tempcustomer = JSON.parse(savedCustomer)
        dispatch(setTheUser(signedIn))
        dispatch(setCustomer(tempcustomer))
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand bg-dark">
        <div className="container-fluid ">
          <a className="navbar-brand lg-dark" style={{ color: 'white' }} href="/">
            T M W
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
          
              <li className="nav-item ">
                <Link className="btn btn-dark" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item ">
                <Link className="btn btn-dark" to="contact">Contact</Link>
              </li>
              <li className="nav-item ">
                <Link className="btn btn-dark" to="flights">Flights</Link>
              </li>
              {user.is_staff ? (
                <>
                <li className="nav-item">
                  <Link className="btn btn-dark" to="airline" >Airline Manager</Link>
                </li>
                </>
               ):('')}
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-dark" to="/myTickets" style={{ color: 'green' }}>{user.email} </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="btn btn-dark" to="/" style={{ color: 'red' }} onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('tokenR');
                      localStorage.removeItem('user')
                      localStorage.removeItem('customer')
                      window.location.href='/';
                    } }>Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-dark" to="login" style={{ color: 'red' }}>Login</Link>
                  </li>

                  <li className="nav-item ">
                    <Link className="btn btn-link " to="register">Not Registerd?</Link>
                  </li>
                </>
              )}
               
               
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
