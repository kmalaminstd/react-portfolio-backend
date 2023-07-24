import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { authContext } from '../context/auth.context';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { storage } from '../config/firebase.config';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

function ImageChange() {
  const {userProfile, currentUser, setDetectChange} = useContext(authContext)
  const {type} = useParams()
  const navigate = useNavigate()

  const [imageName, setImageName] = useState('')
  const [info, setInfo] = useState({
    displayName: currentUser.displayName
  })

  const bucketRef = ref(storage, `images/${uuidv4() + imageName.name}`)


  const handleChange = (e)=>{
    setImageName(e.target.files[0]);
  }


  const handleSubmit = (e)=>{
    e.preventDefault()

    uploadBytes(bucketRef, imageName)
    .then((snapshot)=>{
      setDetectChange(true)
      getDownloadURL(snapshot.ref)
      .then((url)=>{
        setDetectChange(true)
        updateProfile(currentUser,{
          photoURL: url
        }).then((res)=>{
          navigate('/user-profile')
          setDetectChange(true)
          toast.success('Image updated successfully')
        }).catch(err=>{
          toast.error('Image update failed')
          console.log(err);
        })
      }).catch(err=>{
        console.log(err.message);
        console.log(err.code);
        toast.error('Image update failed')
      })
    }).catch(err=>{
      console.log('Uploaded');
      console.log(err.message);
      console.log(err.code);
      toast.error('Image update failed')
    })

  }

  const handleInfoSubmit = (e)=>{
    e.preventDefault()
    updateProfile(currentUser, {
      displayName: info.displayName
    }).then(()=>{
      toast.success("Update successfull")
    }).catch((err)=>{
      console.log(err.message);
      console.log(err.code);
    })
    console.log(currentUser);
  }
  
  const handleInfoChange = (e)=>{
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <div className="imgChange">
        <div className="mainField">

          { 
            type === 'img' &&
            <>
            
              <h2>{`Hi ${!userProfile.displayName ? 'Guest Name Demo' : userProfile.displayName}`}! change your profile picture</h2>

              <form onSubmit={handleSubmit}>
                <input type="file"  accept="image/*" onChange={handleChange} />
                <button style={{cursor: 'pointer'}}>Update Image</button>
              </form>
            </>
          }

          {
            type === "upd" &&

            <>
            

              <h2>{`Hi ${!userProfile.displayName ? 'Guest Name Demo' : userProfile.displayName}`}! update your information</h2>

              <form onSubmit={handleInfoSubmit}>
                <input type="text" name="displayName" onChange={handleInfoChange} placeholder="Your Name" />
                <button style={{cursor: 'pointer'}}>Update Profile Info</button>
              </form>
            
            </>
          }


        </div>
      </div>
    </>
  )
}

export default ImageChange