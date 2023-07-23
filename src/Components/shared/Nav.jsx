import { signOut } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import {HiBars3BottomLeft} from 'react-icons/hi2'
import {RxCross2} from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase.config'
import { authContext } from '../../context/auth.context'

function Nav() {
  // const [toggle, setToggle] = useState(false)
  const {currentUser} = useContext(authContext)

  const navigate = useNavigate()



  return (
    <>  
   
      {/* <div className="navBars" onClick={()=>setToggle(!toggle)}>
        {
          !toggle ?
          <div style={{
            transition: "0.5s step-end"
          }}>
            <HiBars3BottomLeft />
          </div>
          : 
            <div style={{
              transition: "0.5s ease",
              fontWeight: '300'
            }}>
              <RxCross2 />
            </div> 
            
        }
      </div> */}

      
      {
        currentUser && (


          <nav>
            <div className="shortProfile">
              <div className="profilePicture">
                <img src="./userimg.jpeg" alt="" />
              </div>
              <div className="profileName">
                <p>K.M. AL-AMIN</p>
              </div>
            </div>
            <div className="navLinks">
              <ul>
                <li><Link to="/dashboard-overview">Overview</Link></li>
                <li><Link to="/upload-portfolio">Upload Portfolio</Link></li>
                <li><Link to="/manage-portfolio">Manage Portfolio</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/user-profile">Profile</Link></li>
              </ul>
            </div>

            <div className="lgtBtn">
              <button onClick={()=>{
                signOut(auth)
                navigate('/')
              }}>Log Out</button>
            </div>
          </nav>
        )
      }
        
        <div style={{
          content: '',
          display: 'table',
          clear: 'both'
        }}></div>

    </>
  )
}

export default Nav