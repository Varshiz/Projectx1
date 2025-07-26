import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const Guard = () => {
    const {user}=useSelector(state=>state.appuser);
  return (
       user?<Outlet/>:<Navigate to='/' />
  )
}

export default Guard