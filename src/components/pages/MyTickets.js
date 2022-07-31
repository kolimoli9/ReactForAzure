import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer} from '../../plahim/customerSlice';
import { selectTickets, setTickets } from '../../plahim/ticketSlice';
import axios from 'axios';

const MyTickets = () => {
  const customer = useSelector(selectCustomer);
  const tickets = useSelector(selectTickets);
  const dispatch = useDispatch();

  const token = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token)
    }
  }

  const pretytickets = async () => {
    if (tickets.length === 0) {
      axios.get(`http://127.0.0.1:8000/MyTicket/${customer.id}`, config).then((response) => {
        dispatch(setTickets(response.data.tickets))
      })
    }
  }
  pretytickets()

  return (
    <div>
  <div className='shadow-lg p-3 mb-5 bg-body rounded' style={{borderColor:'red'}}>
      <table className="table table-dark table-striped">
        <thead style={{ 'backgroundColor': 'black' }}>
          <tr />
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>NAME</th>
          <th>FROM..</th>
          <th>TO..</th>
          <th>TIME</th>
          <th>Ticket ID</th>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => {
            return (
              <tr key={index}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{ticket.name}</td>
                <td>{ticket.departure}</td>
                <td>{ticket.landing}</td>
                <td>{ticket.time}</td>
                <td>{ticket.id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  )
}
export default MyTickets
