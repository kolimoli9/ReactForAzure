import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../plahim/userSlice';
import { selectChosenFlight, selectFlights, setChosenFlight, setFlights } from '../../../plahim/flightsSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Airline = () => {
// Utils
  const dispatch=useDispatch()
  const [update, setUpdate] = useState(false)
  const [postFlight, setPostFlight] = useState(false)
// Selectors
  const user = useSelector(selectUser);
  const flights = useSelector(selectFlights)
  const flight = useSelector(selectChosenFlight)
// Airline flights
  const [AirlineFlights, setAirlineFlights] = useState([])
// Configuration for axios
  const token = localStorage.getItem('token')
  const config={headers:{"Content-Type": "application/json",Authorization:"Bearer "+String(token)
  }}
// Post-Update flights vars
  const [originC, setOriginC] = useState('')
  const [destenationC, setDestenationC] = useState('')
  const [dep_time, setDep_time] = useState('')
  const [arrival_time, setArrival_time] = useState('')
  const [tickets, setTickets] = useState(10)
// 

  const refreshFlights= async ()=>{
      let request = await fetch("http://127.0.0.1:8000/getflights/");
      let response = await request.json();
      dispatch(setFlights((response)));
      setAirlineFlights([]);
};

  const deleteFlight =async (flight)=>{
     axios.delete(`http://127.0.0.1:8000/flights/${flight.id}`,config).then((response)=>{alert(JSON.stringify(response.data))});
     refreshFlights();
};
  
  const updateFlight=async()=>{
    let data = JSON.stringify({
      origin_country:originC,
      destenation_country:destenationC,
      dep_time:dep_time,
      arrival_time:arrival_time,
      tickets:tickets})
      axios.put(`http://127.0.0.1:8000/flights/${flight.id}`,data,config).then((response)=>{
       if(response.status===200){
        alert(response.data.message)
        setUpdate(false);
        refreshFlights();
      }
      else{
      console.log(response)
    }})
};
 

  const addFlight = async()=>{
    let data = JSON.stringify({
      airline: user.airline,
      origin_country:originC,
      destenation_country:destenationC,
      dep_time:dep_time,
      arrival_time:arrival_time,
      tickets:tickets})
      axios.post('http://127.0.0.1:8000/flights/',data,config).then((response)=>{
       if(response.status===200){
        alert(response.data.message)
        setOriginC('');
        setDestenationC('');
        setDep_time('');
        setArrival_time('');
        setTickets('');
        refreshFlights();
      }
      else{
      console.log(response)
    }})
};




  useEffect(()=>{
    if(AirlineFlights.length===0){
    const tempFlights = []
    flights.forEach(flight => {
      if(flight.airline===user.airline){
        tempFlights.push(flight)
      }
    });
    setAirlineFlights(tempFlights);
  }else{
    console.log(' Airline useEffect Run+')
  }
  },[AirlineFlights,flights,user]) 
if(user.airline){
  return (
    <div>
    <div className='shadow-lg p-3 mb-5 bg-body rounded'>
        
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
    <th></th>
    <th></th>
    </tr>
    </thead>
<tbody>

{ AirlineFlights.map(( flight, index ) => {
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
              <td><button className='btn btn-danger' onClick={()=>deleteFlight(flight)}>Delete</button></td>
              <td><button className='btn btn-info' onClick={()=>{
                setUpdate(true);
                dispatch(setChosenFlight(flight));
              }}>Update</button></td>
            </tr>
          );
        })}
        <tr>
        <td><button className='btn btn-success' onClick={()=>setPostFlight(true)}>Add</button></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        </tr>
    </tbody>
</table>
        

        </div>
    {postFlight ? (
        <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
        <div className="wrapper wrapper--w790">
          <div className="card card-5">
              <div className="card-heading">
                  <h2 className="title" style={{color:'green'}}>Add Flight</h2>
              </div>
              <div className="card-body" style={{background:'black'}}>
                      <div className="form-row m-b-55">
                          <div className="name">Airline</div>
                          <div className="value">
                              <div className="row row-refine">
                                  <div className="col-9">
                                      <div className="input-group-desc">
                                          <input className="input--style-5" type="text" defaultValue={user.airline} disabled={true}></input>
                                          <label className="label--desc">Airline Name</label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                        {/*  */}
                        <div className="form-row m-b-55">
                          <div className="name">Origin Country</div>
                          <div className="value">
                              <div className="row row-refine">
                                  <div className="col-9">
                                      <div className="input-group-desc">
                                          <select  className="input--style-5" type="text" value={originC} onChange={(e)=>setOriginC(e.target.value)}>
                                            <option value={''}>Choose...</option>
                                            <option value={'ENGLAND'} >ENGLAND</option>
                                            <option value={'ISRAEL'}>ISRAEL</option>
                                            <option value={'USA'}>USA</option>
                                            <option value={'THILAND'}>THILAND</option>
                                            <option value={'TURKY'}>TURKY</option>
                                          </select>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                        {/*  */}
                        <div className="form-row m-b-55">
                          <div className="name">Destination Country</div>
                          <div className="value">
                              <div className="row row-refine">
                                  <div className="col-9">
                                      <div className="input-group-desc">
                                      <select  className="input--style-5" type="text" value={destenationC} onChange={(e)=>setDestenationC(e.target.value)} >
                                            <option value={''} >Choose...</option>
                                            <option value={'ENGLAND'} >ENGLAND</option>
                                            <option value={'ISRAEL'}>ISRAEL</option>
                                            <option value={'USA'}>USA</option>
                                            <option value={'THILAND'}>THILAND</option>
                                            <option value={'TURKY'}>TURKY</option>
                                          </select>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                        {/*  */}
                        <div className="form-row m-b-55">
                          <div className="name">Departure Time</div>
                          <div className="value">
                              <div className="row row-refine">
                                  <div className="col-9">
                                      <div className="input-group-desc">
                                          <input className="input--style-5" type="datetime-local" value={dep_time} onChange={(e)=>setDep_time(e.target.value)}/>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="form-row m-b-55">
                          <div className="name">Arrival Time</div>
                          <div className="value">
                              <div className="row row-refine">
                                  <div className="col-9">
                                      <div className="input-group-desc">
                                          <input className="input--style-5" type="datetime-local" value={arrival_time} onChange={(e)=>setArrival_time(e.target.value)}  />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="form-row m-b-55">
                          <div className="name">Initial Tickets</div>
                          <div className="value">
                              <div className="row row-refine">
                                  <div className="col-9">
                                      <div className="input-group-desc">
                                          <input className="input--style-5" type= "number"  value={tickets} onChange={(e)=>setTickets(e.target.value)}/>
                                          <label className="label--desc">Enter a number of initial tickets</label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div>
                          <button className="btn btn-outline-success" onClick={()=>addFlight()}>Create</button>
                      </div>
                      <div style={{position:'absolute',top:'85%',left:'70%'}}>
                      <button className="btn btn-outline-danger" onClick={()=>setPostFlight(false)}>cancel</button>
                      </div>
                          </div>
                      </div>
                  </div>
                </div>):('')}


  {update ? (
                  <>
                  <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
        <div className="wrapper wrapper--w790">
          <div className="card card-5">
              <div className="card-heading" style={{background:'#66c2ff'}}>
                  <h2 className="title" style={{background:'#66c2ff'}}>Update</h2>
              </div>
              <div className="card-body" style={{background:'black'}}>
                      <div className="form-row m-b-55">
                          <div className="name">Airline</div>
                          <div className="value">
                              <div className="row row-refine">
                                  <div className="col-9">
                                      <div className="input-group-desc">
                                          <input className="input--style-5" type="text" defaultValue={user.airline} disabled={true}></input>
                                          <label className="label--desc">Airline Name</label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      {/*  */}

                      <div className="form-row m-b-55">
                          <div className="name">Flight  id#</div>
                          <div className="value">
                              <div className="row row-refine">
                                  <div className="col-9">
                                      <div className="input-group-desc">
                                          <input className="input--style-5" type="text" defaultValue={flight.id} disabled={true} style={{background:'black',color:'green'}}></input>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                        {/*  */}
                        <div className="form-row m-b-55">
                          <div className="name">Origin Country</div>
                          <div className="value">
                              <div className="row row-refine">
                                  <div className="col-9">
                                      <div className="input-group-desc">
                                          <select  className="input--style-5" type="text" defaultValue={flight.from} onChange={(e)=>setOriginC(e.target.value)}>
                                            <option value={''}>Choose...</option>
                                            <option value={'ENGLAND'} >ENGLAND</option>
                                            <option value={'ISRAEL'}>ISRAEL</option>
                                            <option value={'USA'}>USA</option>
                                            <option value={'THILAND'}>THILAND</option>
                                            <option value={'TURKY'}>TURKY</option>
                                          </select>
                                          <label className="label--desc">select new origin country</label>

                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                        {/*  */}
                        <div className="form-row m-b-55">
                          <div className="name">Destination Country</div>
                          <div className="value">
                              <div className="row row-refine">
                                  <div className="col-9">
                                      <div className="input-group-desc">
                                      <select  className="input--style-5" type="text" defaultValue={flight.too} onChange={(e)=>setDestenationC(e.target.value)} >
                                            <option value={''} >Choose...</option>
                                            <option value={'ENGLAND'} >ENGLAND</option>
                                            <option value={'ISRAEL'}>ISRAEL</option>
                                            <option value={'USA'}>USA</option>
                                            <option value={'THILAND'}>THILAND</option>
                                            <option value={'TURKY'}>TURKY</option>
                                          </select>
                                          <label className="label--desc">select new destination country</label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                        {/*  */}
                        <div className="form-row m-b-55">
                          <div className="name">Departure Time</div>
                          <div className="value">
                              <div className="row row-refine">
                                  <div className="col-9">
                                      <div className="input-group-desc">
                                          <input className="input--style-5" type="datetime-local" value={dep_time} onChange={(e)=>setDep_time(e.target.value)}/>
                                          <label className="label--desc">select new departure time</label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="form-row m-b-55">
                          <div className="name">Arrival Time</div>
                          <div className="value">
                              <div className="row row-refine">
                                  <div className="col-9">
                                      <div className="input-group-desc">
                                          <input className="input--style-5" type="datetime-local" value={arrival_time} onChange={(e)=>setArrival_time(e.target.value)}  />
                                          <label className="label--desc">select new arrival time</label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="form-row m-b-55">
                          <div className="name"> Tickets</div>
                          <div className="value">
                              <div className="row row-refine">
                                  <div className="col-9">
                                      <div className="input-group-desc">
                                          <input className="input--style-5" type= "number"  defaultValue={flight.tickets}  onChange={(e)=>setTickets(e.target.value)}/>
                                          <label className="label--desc">Enter the new ammount of tickets</label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div>
                          <button className="btn btn-outline-success" onClick={()=>updateFlight()}>Save</button>
                      </div>
                      <div style={{position:'absolute',top:'85%',left:'70%'}}>
                      <button className="btn btn-outline-danger" onClick={()=>setUpdate(false)}>cancel</button>
                      </div>
                          </div>
                      </div>
                  </div>
                </div>
                  </>
                ):('')}
        </div>
  )
}else{
    return(
        <div style={{position:'absolute',left:'40%',top:'40%'}}>
      <Link className='btn btn-danger'style={{color:'black'}} to={'/'}>Unauthorized</Link>
      <br></br>
      <br></br>
      <h1 className='text text-danger' style={{paddingLeft:80}}>401</h1>
    </div>
    )
}}

export default Airline