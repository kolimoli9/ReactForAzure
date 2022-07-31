import './Contact.css' 
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectUser } from '../../plahim/userSlice'
import { useNavigate } from 'react-router-dom'
const Contact = () => {
  const user = useSelector(selectUser)
  const nav = useNavigate()

  const cancel=()=>{nav("/")}
  const send= async ()=>{
    let DATA = {
      EMAIL:document.getElementById('EMAIL').value,
      SUBJECT:document.getElementById('SUBJECT').value,
      NAME:document.getElementById('NAME').value,
      MESSAGE:document.getElementById('MESSAGE').value,
    }
     axios.post('http://127.0.0.1:8000/contact/',DATA).then((response)=>{alert(response.data.message);nav('/');})
    
  };

  return (
    <div className='contact'>
      <div className="background">
  <div className="container">
    <div className="screen">
      <div className="screen-header">
        <div className="screen-header-left">
          
        </div>
      </div>
      <div className="screen-body">
        <div className="screen-body-item left">
          <div className="app-title">
            <span>CONTACT US</span>
            <span><br/>We will try our best to answer quick!</span>
          </div>
          <div className="app-contact">CONTACT INFO : +972 51 14928 595</div>
        </div>
        <div className="screen-body-item">
          <div className="app-form">
            <div className="app-form-group">
              <input className="app-form-control" placeholder="NAME" defaultValue={user?(user.first_name):("")} id='NAME'></input>
            </div>
            <div className="app-form-group">
              {
                user ? (
                  <input className="app-form-control" placeholder={user.email} defaultValue={user.email} id='EMAIL'></input>
                ):(
                  <input className="app-form-control" placeholder="EMAIL" id='EMAIL'></input>
                )
              }
              
            </div>
            <div className="app-form-group">
              <input className="app-form-control" placeholder="SUBJECT" id='SUBJECT'></input>
            </div>
            <div className="app-form-group message">
              <input className="app-form-control" placeholder="MESSAGE" id='MESSAGE'></input>
            </div>
            <div className="app-form-group buttons">
              <button className="app-form-button" id='send' onClick={()=>send()}>SEND</button>
              <button className="app-form-button" id='cancel' onClick={()=>cancel()}>cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Contact