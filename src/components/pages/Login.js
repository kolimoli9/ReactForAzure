import React, {  useState  } from 'react';
import  jwt_decode  from "jwt-decode";
import {  useDispatch} from 'react-redux';
import { setTheUser} from '../../plahim/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
	const nav = useNavigate();
	const [Checkbox, setCheckbox] = useState(false)
	
	const getlogin = async () => {
        let response = await fetch("http://127.0.0.1:8000/login/", {
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
		}else{alert('You are not in the system,\n please register.');window.location.href = "/register"}
	};
const RememberMe = ()=>{
	if(Checkbox===true){
		setCheckbox(false)
	}if(Checkbox ===false){
		setCheckbox(true)
	}
};



  return (
    <div className='login'>
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
							Forgot :
						</span>
						<Link className="txt2" to="/forgot-pwd">
							Username  /  Password <span> ? </span>
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