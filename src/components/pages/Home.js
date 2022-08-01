import axios from "axios";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  selectFlights, setShowFlights } from "../../plahim/flightsSlice";
import { selectUser } from "../../plahim/userSlice";


const Home = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
// HOME VARS 
    const flights = useSelector(selectFlights)
    const user = useSelector(selectUser)
    const [From, setFrom] = useState("ISRAEL")
    const [To, setTo] = useState("ENGLAND")
    const [Depart, setDepart] = useState("")
    const [CLASS, setCLASS] = useState(1)
    const [adults, setAdults] = useState(1)
    const ChosenFlights = []
// ADMIN VARS 
    const token = localStorage.getItem('token')
    const config={headers:{"Content-Type": "application/json",Authorization:"Bearer "+String(token)}}
    const [Users, setUsers] = useState([])
    const [edit, setEdit] = useState(false)
    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [airline, setAirline] = useState(false)
    const [Admin, setAdmin] = useState(false)
    const [ChosenUser, setChosenUser] = useState({})
    const [airlineName, setAirlineName] = useState('')
// END VARS 

// FUNCTIONS 
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
useEffect(() => {
  async function fetchUsers(){
    const token = localStorage.getItem('token')
    const config={headers:{"Content-Type": "application/json",Authorization:"Bearer "+String(token)}}
    axios.get('http://127.0.0.1:8000/users/',config).then((response)=>{
        if(response.status===200){
        console.log(response.data); setUsers(response.data)}else{console.log(response)}
    })    
    };
    if(user.is_admin && Users.length===0){
        fetchUsers();
    } 
},[user,Users]);

 
 const EditUser = async(User)=>{
    let data = JSON.stringify({
       username : Username,
       email : Email,
       is_staff : airline,
       is_superuser : Admin, 
       airline_name : airlineName
    })
    axios.put(`http://127.0.0.1:8000/users/${ChosenUser.id}`,data,config).then((response)=>{
        console.log(response.data)
    })
    setEdit(false);
    setAdmin(false);
    setAirline(false);
    setAirlineName('');
    setUsername('');
    setEmail('');
    setUsers([]);
}; 

  const DeleteUser = async (User)=>{
    axios.delete(`http://127.0.0.1:8000/users/${User.id}`,config).then((response)=>{
        console.log(alert(response.data.message))
    });
    setTimeout(function(){ setUsers([]) }, 5000);
    ;
};

    return (
        <>
{user.is_admin ? (
    <div>
    {edit ? (<>
        <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
            <div className="wrapper wrapper--w790">
                <div className="card card-5">
                    <div className="card-heading" style={{background:'#66c2ff'}}>
                        <h2 className="title" style={{background:'#66c2ff'}}>Edit User</h2>
                    </div>
                    <div className="card-body">
                        <div>
                            <div className="form-row">
                                <div className="name">Username</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input className="input--style-5" type="text" defaultValue={ChosenUser.username} onChange={(e)=>setUsername(e.target.value)}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="name">Email</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input className="input--style-5" type="email" defaultValue={ChosenUser.email} onChange={(e)=>setEmail(e.target.value)}></input>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="form-row p-t-20">
                                <label className="label label--block">Staff Status - leave blank to avoide permission changes</label>
                                <div className="p-t-15">
                                    <label className="radio-container m-r-55">Admin 
                                        <input type="checkbox"  name="exist" defaultChecked={Admin} defaultValue={Admin}  onChange={()=>{if(Admin){setAdmin(false)}if(Admin===false){setAdmin(true)}}}></input>
                                        <span className="checkmark"></span>
                                    </label>
                    
                                    <label className="radio-container">Staff
                                        <input type="checkbox" name="exist"  defaultChecked={airline} defaultValue={airline}  onChange={()=>{if(airline){setAirline(false)}if(airline===false){setAirline(true)}}}></input>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            {airline ? (
                            <div className="form-row">
                                <div className="name">Airline :</div>
                                <div className="value">
                                    <div className="input-group">
                                    <select className="input--style-5" defaultValue={ChosenUser.airline} onChange={(e)=>setAirlineName(e.target.value)}>
                                        <option >Choose</option>
                                        <option value={'El-Al'}>El-Al</option>
                                        <option value={'Arkia'}>Arkia</option>
                                        <option value={'Wizz'}>Wizz </option>
                                    </select>
                                    </div>
                                </div>
                            </div>):('')}
                            <div>
                                <button className="btn btn-success" onClick={()=>EditUser()}>Save</button>
                            </div>
                            <div style={{position:'absolute',top:'77%',left:'70%'}}>
                          <button className="btn btn-outline-danger" onClick={()=>setEdit(false)}>cancel</button>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </>):('')}

<div className='container'>

<table className="table table-dark table-striped" >
    <thead style={{'backgroundColor':'black'}}>
    <tr >
    <th>ID</th>
    <th>Username</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Staff Status</th>
    <th>Super User</th>
    <th></th>
    
    </tr>
    </thead>
<tbody>
  
{ Users.map(( User, index ) => {
          return (
            <tr key={index}>
              <td>{User.id}</td> 
              <td>{User.username}</td> 
              <td>{User.first_name}</td> 
              <td>{User.last_name}</td> 
              <td>{User.email}</td> 
              {User.is_staff ? (
              <td style={{color:'green'}}>V : {User.airline}</td>
              ):(
                <td style={{color:'red'}}>X</td>
              )}
              {User.is_superuser ? (
              <td style={{color:'green'}}>V</td>
              ):(
                <td style={{color:'red'}}>X</td>
              )}  
              <td><button className='btn btn-info' onClick={()=>{setChosenUser(User);setEdit(true);setAirline(User.is_staff);setAdmin(User.is_superuser);}}>Edit</button> <button className='btn btn-danger' onClick={()=>DeleteUser(User)}>Delete</button></td>
            </tr>
          );
        })}
</tbody>
    </table>
    </div>
    </div>
):(
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
    )}

</>);
  };
  
  export default Home;
  