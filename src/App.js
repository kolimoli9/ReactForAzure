import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Contact from "./components/pages/Contact";
import NoPage from "./components/pages/NoPage";
import Forgot from "./components/pages/Forgot";
import Register from "./components/pages/Register";
import Flights from "./components/pages/Flights";
import CustomerInput from "./components/CustomerInput";
import TicketFinal from "./components/TicketFinal";
import ShowFlights from './components/ShowFlights';
import Airline from './components/pages/staff/Airline';
import MyTickets from './components/pages/MyTickets';
const App = ()=> {

    return (

    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="showFlights" element={<ShowFlights />}/>
            <Route path="login" element={<Login />} />
            <Route path="contact" element={<Contact />} />
            <Route path="forgot-pwd" element={<Forgot />} />
            <Route path="register" element={<Register />} />
            <Route path="flights" element={<Flights />}/>
            <Route path="flights/customerInfo" element={<CustomerInput />} />
            <Route path="flights/ticketFinal" element={<TicketFinal />} />
            <Route path="airline" element={<Airline />} />
            <Route path='myTickets' element={<MyTickets/>}/>
            <Route path="*" element={<NoPage />} />
          </Route>
      </Routes>
    </BrowserRouter>

    );
  };
export default App;  
