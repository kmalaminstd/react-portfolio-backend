import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { authContext } from '../context/auth.context';

function Private({children}) {
  const {loader, currentUser} = useContext(authContext)
  const location = useLocation()
  let loadComp;

  if(loader){
    loadComp = currentUser ? (children) : <Navigate to="/" state={{from: location.pathname}} />
  }else{
    return "Loading"
  }
  
  return (
    <>
      {
        loadComp
      }
    </>
  )
}

export default Private