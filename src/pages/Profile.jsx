import React, { useContext } from 'react'
import { authContext } from '../context/auth.context'
import { Link } from 'react-router-dom'

function Profile() {
  const {userProfile, currentUser} = useContext(authContext)

  console.log(currentUser);

  return (
    <>
      <div className="profile">
        <div className="innerProfile">
            <div className="userProDetails">
              <div className="profilePicture">
                <img src={!currentUser.photoURL ? './userimg.jpeg' : currentUser.photoURL} alt="" />
                <button><Link to={`/update-profile/img/${userProfile.id}`}>Change Picture</Link></button>
              </div>
              <div className="profileDetails">
                <p><b>Name:</b> {!currentUser.displayName ? "User Guest Name" : currentUser.displayName}</p>
                <p><b>Email: </b> {currentUser.email}</p>
                <button><Link to={`/update-profile/upd/${userProfile.id}`}>Update Profile Details</Link></button>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile