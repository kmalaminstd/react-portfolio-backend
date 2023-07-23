import React, { useContext } from 'react'
import { authContext } from '../context/auth.context'

function Profile() {
  const {userProfile} = useContext(authContext)



  return (
    <>
      <div className="profile">
        <div className="innerProfile">
            <div className="userProDetails">
              <div className="profilePicture">
                <img src={!userProfile.photoURL ? './userimg.jpeg' : userProfile.photoURL} alt="" />
                <button>Change Picture</button>
              </div>
              <div className="profileDetails">
                <p><b>Name:</b> {!userProfile.displayName ? "User Guest Name" : userProfile.displayName}</p>
                <p><b>Email: </b> {userProfile.email}</p>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile