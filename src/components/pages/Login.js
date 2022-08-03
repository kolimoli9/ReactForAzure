import React, {  useState  } from 'react';
import  jwt_decode  from "jwt-decode";
import {  useDispatch} from 'react-redux';
import { setTheUser} from '../../plahim/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
	const nav = useNavigate();
	const [Checkbox, setCheckbox] = useState(false)
	const [resetEmail, setResetEmail] = useState('')
	
	const getlogin = async () => {
        let response = await fetch("https://tmw-my-server.azurewebsites.net/login/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            username: username,
            password: password,
            }), 
        })
        if(response.status===200){
            let data = await response.json();
            localStorage.setItem("token",data.access);
            localStorage.setItem("tokenR",data.refresh); 
			let decodedToken = jwt_decode(data.access)
			let newUser = {
				id:decodedToken.user_id,
				username: decodedToken.username,
				email:decodedToken.email,
				is_staff:decodedToken.is_staff,
				first_name:decodedToken.first_name,
				last_name:decodedToken.last_name,
			}
			if(decodedToken.airline){
				newUser['airline']=decodedToken.airline}
			if(decodedToken.is_admin){
				newUser['is_admin']=decodedToken.is_admin
			}	
            if(Checkbox){localStorage.setItem('user',JSON.stringify(newUser))};
            dispatch(setTheUser(newUser));
			nav("/")
		}else{alert('You are not in the system,\n please register.'); nav("/register")}
	};
const RememberMe = ()=>{
	if(Checkbox===true){
		setCheckbox(false)
	}if(Checkbox ===false){
		setCheckbox(true)
	}
};
const forgotPwd = async ()=>{
	let config ={headers: {"Content-Type":"application/json"}};
	let data=JSON.stringify({
		email:resetEmail
	});
	axios.post('https://tmw-my-server.azurewebsites.net/forgot_password/',data,config).then((response)=>{
		console.log(response)
	  if(response.status===200){
		alert(response.data.message)
		setResetEmail('')
		window.location.reload()
		}else{setResetEmail('');window.location.reload();}
	})
};


  return (
    <div className='login'>
		{/* Start Modal */}
		<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel" style={{fontWeight:700}}>Forgot Password ?</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      	<div className="modal-body">
	  		<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
				<input className="input100" type="text" name="email" placeholder="Email (e.g myUser@gmail.com)" defaultValue={resetEmail} onChange={(e)=>setResetEmail(e.target.value)} />
				<span className="focus-input100"></span>
				<span className="symbol-input100">
				<i className="fa fa-envelope" aria-hidden="true"></i>
				</span>
			</div>
			   <small style={{paddingLeft:40}}>would you like to recieve new password? offcourse you would.</small>
      	</div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">close</button>
        <button type="button" className="btn btn-success" onClick={()=>forgotPwd()}>Send</button>
      </div>
    </div>
  </div>
</div>
{/* End Modal */}
<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src={process.env.PUBLIC_URL + "/images/img-01.png"} alt="IMG"></img>
				</div>

				<div className="login100-form validate-form">
					<span className="login100-form-title">
						Login
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" name="email" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} ></input>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password" name="pass" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} ></input>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick={()=>getlogin()}>
							Login
						</button>
					</div>
					<div className="text-center p-t-12">
						<span style={{color:'green'}} disabled={true}>Remember Me</span>
					    <input className="form-check-input mt-0"  type="checkbox" value={Checkbox} onClick={()=>RememberMe()}/>
					</div>
					<div className="text-center p-t-12">
						<span className="txt1">
							
						</span>
						<Link className="txt2" to={'#'} data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
							Forgot  Password <span> ? </span>
						</Link>

					</div>

					<div className="text-center p-t-136">
						<Link className="txt2" to="/register">
							Create your Account
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</Link>
					</div>
				</div>
			</div>
		</div>









    </div>
  )
};

export default Login