import React from 'react'
import '../assets/css/login.css'
import { useState } from 'react'
import { auth } from '../config/firebase.config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { authContext } from '../context/auth.context'
import { useLocation, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const {currentUser, loader} = useContext(authContext)
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(false)
  

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!data.email || !data.password){
      setError(true)
    }else{
      setError(false)
      signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential)=>{
        const user = userCredential.user
        console.log(user);
        toast.success("Login Successfull")
        data.email = ''
        data.password = ''
        navigate(location?.state?.from || "/dashboard-overview")
      })
      .catch((err)=>{
        console.log(err.message);
        console.log(err.code);
        toast.err("Login Failed")
      })

      
    }


  }

  const handleChange = (e)=>{
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>

     
      {
        
        !currentUser &&  (
          
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h2>Admin Login</h2>
            <p style={{color:'red'}}> {error && !data.email ? 'Invalid email field' : ''} </p>
            <input onChange={handleChange} type="email" name="email" placeholder="Admin Email" value={data.email} />
            
            <p style={{color:'red'}}> {error && !data.password ? 'Invalid password field' : ''} </p>
            <input onChange={handleChange} type="password" name="password" placeholder="Admin Password" value={data.password} />
            <input type="submit" value="Login" />
          </form>
        </div>
        ) 
      }

    </>
  )
}

export default Login