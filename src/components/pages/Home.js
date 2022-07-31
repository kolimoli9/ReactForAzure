import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  selectFlights, selectShowFlights, setShowFlights } from "../../plahim/flightsSlice";
import axios from 'axios';


const Home = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const flights = useSelector(selectFlights)
    const ShowFlights = useSelector(selectShowFlights)

    const [From, setFrom] = useState("ISRAEL")
    const [To, setTo] = useState("ENGLAND")
    const [Depart, setDepart] = useState("")
    const [CLASS, setCLASS] = useState(1)
    const [adults, setAdults] = useState(1)
    const ChosenFlights = []

    const showFlights= async ()=>{
        flights.forEach(flight => {
            console.log(flight)
            if(flight.from === From && flight.too===To){
                ChosenFlights.push(flight)
            }if(flight.from !== From && flight.too===To){
                ChosenFlights.push(flight)
            }if(flight.dep_date===Depart){
                ChosenFlights.push(flight)
            }
            })
            if(ChosenFlights.length===0){
            alert('No Flights Under Those Parameters Exist..')
            nav('/')
            }else{
            dispatch(setShowFlights(ChosenFlights))
            nav('/showFlights')
            }
            console.log(ChosenFlights)
            };
          



    return (

<div id="booking" className="section">
		<div className="section-center">
			<div className="container">
				<div className="row">
					<div className="booking-form">
        <div>
            <div className="form-group">
                <div className="form-checkbox">
                    <label htmlFor="roundtrip">
                        <input type="radio" id="roundtrip" name="flight-type"></input>
                        <span></span>Roundtrip
                    </label>
                    <label htmlFor="one-way">
                        <input type="radio" id="one-way" name="flight-type"></input>
                        <span></span>One way
                    </label>
                    
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <span className="form-label">Flying from</span>
                        <select className="form-control" type="text"  value={From} onChange={(e)=>setFrom(e.target.value)}>
                            <option value={'ISRAEL'}>ISRAEL</option>
                            <option value={'ENGLAND'}>ENGLAND</option>
                            <option value={'USA'}>USA</option>
                            <option value={'THILAND'}>THILAND</option>
                            <option value={'TURKY'}>TURKY</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <span className="form-label">Flyning to</span>
                        <select className="form-control" type="text"  value={To} onChange={(e)=>setTo(e.target.value)}>
                            <option value={'ENGLAND'}>ENGLAND</option>
                            <option value={'ISRAEL'}>ISRAEL</option>
                            <option value={'USA'}>USA</option>
                            <option value={'THILAND'}>THILAND</option>
                            <option value={'TURKY'}>TURKY</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <span className="form-label">Departing</span>
                        <input className="form-control" type="date"  value={Depart} onChange={(e)=>setDepart(e.target.value)}></input>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <span className="form-label">Returning</span>
                        <input className="form-control" type="date" ></input>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group">
                        <span className="form-label">Adults (18+)</span>
                        <select className="form-control" value={adults} onChange={(e)=>setAdults(e.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                        <span className="select-arrow"></span>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group">
                        <span className="form-label">Children (0-17)</span>
                        <select className="form-control">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                        <span className="select-arrow"></span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <span className="form-label">Travel className</span>
                        <select className="form-control" value={CLASS} onChange={(e)=>setCLASS(e.target.value)}>
                            <option value={1}>Economy class</option>
                            <option value={2}>Business class</option>
                            <option value={3}>First class</option>
                        </select>
                        <span className="select-arrow"></span>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-btn">
                        <button className="submit-btn" onClick={()=>showFlights()}>Show flights</button>
                    </div>
                </div>
            </div>
        </div>
					</div>
				</div>
			</div>
		</div>
	</div>
    

    );
  };
  
  export default Home;
  