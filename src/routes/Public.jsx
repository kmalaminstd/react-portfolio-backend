import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { authContext } from '../context/auth.context'

function Public({children}) {
  const location = useLocation()
  const {currentUser} = useContext(authContext)
  console.log(location);

  const loadComp = currentUser ? (
    <Navigate to={location?.state?.from ? location.state.from : "/dashboard-overview"} />
  ) : children


  return (
    <>
      {
        loadComp
      }
    </>
  )
}

export default Public