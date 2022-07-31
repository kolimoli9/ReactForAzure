import React from 'react'
import {  useSelector } from 'react-redux';
import { selectUser } from '../../../plahim/userSlice';

const Admin = () => {
  const user = useSelector(selectUser)
  return (
    <div>
        Admin




        
        </div>
  )
}

export default Admin