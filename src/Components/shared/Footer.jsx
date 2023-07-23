import React, { useContext } from 'react'
import { authContext } from '../../context/auth.context'

function Footer() {
  const {currentUser} = useContext(authContext)
  return (
    <>
    { 
      currentUser &&

      <footer>
        <p>Portfolio Dashboard</p>
      </footer>
    }
    </>
  )
}

export default Footer