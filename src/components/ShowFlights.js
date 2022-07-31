import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCustomer, setCustomer } from '../plahim/customerSlice'
import { selectShowFlights, setChosenFlight, setShowFlights } from '../plahim/flightsSlice'
import { selectUser } from '../plahim/userSlice'
import axios from 'axios'
const ShowFlights = () => {
  const dispatch = useDispatch()
  const ShowFlights = useSelector(selectShowFlights)
  const customer = useSelector(selectCustomer)
  const user = useSelector(selectUser)
  const nav = useNavigate()
const reset = ()=>{
  dispatch(setShowFlights([]))
  window.location.href='/'
};


const getCustomerS = async(flight)=>{
  if(customer===null){
    let token = localStorage.getItem('token')
    axios.get(`http://127.0.0.1:8000/customers/get-update/${user.id}`,{
      headers:{
        "Content-Type": "application/json",
        Authorization:"Bearer "+String(token)
      }}).then((response)=>{
          let cus = response.data
            if(cus){ 
            dispatch(setCustomer(cus));
            dispatch(setChosenFlight(flight));
            nav("/flights/ticketFinal")
            }else{
            dispatch(setChosenFlight(flight));
            nav('/flight/customerInfo')
            }
          })
  }else{
        dispatch(setChosenFlight(flight));
        nav("/flights/ticketFinal")
        }
};


const orderNowS = (flight)=>{
  if(user===false){
    alert('You Need To Sign In First !')
    nav("/login")
  }if(user){
    getCustomerS(flight); 
  }
};
  
  return (
    
    <div>
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
  
{ ShowFlights.map(( flight, index ) => {
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
              <td><button className='btn btn-success' onClick={()=>orderNowS(flight)}>Order Now!</button></td>
            </tr>
          );
        })}
</tbody>
    </table>
    <button className='btn btn-outline-danger'  onClick={()=>reset()}>Back</button>
    </div>


    </div>
  )
}

export default ShowFlights