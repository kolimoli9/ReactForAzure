import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCustomer, setCustomer } from '../../plahim/customerSlice';
import {  selectFlights, setChosenFlight, setFlights } from '../../plahim/flightsSlice';
import { selectUser } from '../../plahim/userSlice';
const Flights = () => {

  const nav =useNavigate()
    const customer = useSelector(selectCustomer)
    const user = useSelector(selectUser)
    
    const flights=useSelector(selectFlights)
    const dispatch = useDispatch()
   
useEffect(()=>{
  async function fetchData() {
    let request = await fetch("http://127.0.0.1:8000/getflights/");
    let response = await request.json();
    dispatch(setFlights((response)));
  }
    
    },[flights,dispatch])
    
    const getCustomer = (flight)=>{
      if(customer===null){
        dispatch(setChosenFlight(flight));
        nav('customerInfo')
        
        }
      else{
        dispatch(setChosenFlight(flight));
        nav("ticketFinal")
      }
        };
    
    const orderNow = (flight)=>{
      if(user===false){
        alert('You Need To Sign In First !')
        nav("/login")
        }if(user){
          getCustomer(flight); 
    }
  };
  useEffect(() => {
    async function fetchCustomer(){
    let token = localStorage.getItem('token')
            axios.get(`http://127.0.0.1:8000/customers/get-update/${user.id}`,{
                headers:{
                  "Content-Type": "application/json",
                  Authorization:"Bearer "+String(token)
                }}).then((response)=>{
          try{
            dispatch(setCustomer(response.data))
          }catch(error){
            console.log(error)
          }})
    }
    if(user){
      fetchCustomer()
    }
   },[user,dispatch])

 
  return (
    
    <div className='flights'>
      
    <div className='container'>

<table className="table table-dark table-striped" >
    <thead style={{'backgroundColor':'black'}}>
    <tr >
    <th>ID</th>
    <th>TICKETS</th>
    <th>FROM..</th>
    <th>TO..</th>
    <th>AIRLINE</th>
    <th>DEPARTURE</th>
    <th>Take Of</th>
    <th>ARRIVAL</th>
    <th>Land</th>
    </tr>
    </thead>
<tbody>
  
{ flights.map(( flight, index ) => {
          return (
            <tr key={index}>
              <td>{flight.id}</td>
              <td>{flight.tickets}</td>
              <td>{flight.from}</td>
              <td>{flight.too}</td>
              <td>{flight.airline}</td>
              <td>{flight.dep_date}</td>
              <td>{flight.dep_time}</td>
              <td>{flight.arrival_date}</td>
              <td>{flight.arrival_time}</td> 
              <td><button className='btn btn-success' onClick={()=>orderNow(flight)}>Order Now!</button></td>
            </tr>
          );
        })}
</tbody>
    </table>
    </div>  
   
    </div>
  )
}

export default Flights