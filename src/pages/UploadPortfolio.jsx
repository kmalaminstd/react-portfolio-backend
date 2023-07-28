import React, { Profiler, useContext, useState } from 'react'

import { PortfolioContext } from '../context/Portfolio.context'
import { addDoc, collection, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase.config'
import { v4 as uuidGen } from 'uuid'
import { useNavigate } from 'react-router-dom'



function UploadPortfolio() {
  const {uploadPort} = useContext(PortfolioContext)
  const navigate = useNavigate()

  const [portInfo, setPortInfo] = useState({
    portTitle: '',
    portShortDesc: '',
    tag: '',
  })
  const [imageName, setImageName] = useState('')
  
  const [error, setError] = useState(false)

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!portInfo.portTitle || !portInfo.portShortDesc || !portInfo.tag || !imageName){
      alert("Invalid Field")
      setError(true)
    }else{

      uploadPort(portInfo, imageName)
      navigate('/manage-portfolio')
    }
  }

  // console.log(imageName);

  const handleChange = (e)=>{
    setPortInfo({
      ...portInfo, 
      [e.target.name] : e.target.value,
      id: uuidGen()
    })
    
  }

  return (
    <>
      <div className="upldPort">
        <div className="inner-div">
          <h2>Upload Profolio Information</h2>

          <form onSubmit={handleSubmit}>
            <input type="text" name="portTitle" placeholder="Portfolio Title" value={portInfo.portTitle} onChange={handleChange} />
            <input type="text" name="portShortDesc" placeholder="Short Description" value={portInfo.portShortDesc} onChange={handleChange} />
            
            <select name="tag" id="tag" value={portInfo.tag} onChange={handleChange}>
              <option value="" disabled>Choose Your Option</option>
              <option value="javascript">Javascript</option>
              <option value="react.js">React.js</option>
            </select>

            <input type="file" onChange={(e)=>setImageName(e.target.files[0])} accept="*/image" />

            <input type="submit" value="Submit Portolio" />
          </form>
        </div>
      </div>
    </>
  )
}

export default UploadPortfolio