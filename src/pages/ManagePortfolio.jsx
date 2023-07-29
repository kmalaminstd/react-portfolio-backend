import React, { useContext } from 'react'
import { PortfolioContext } from '../context/Portfolio.context'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase.config'
import { toast } from 'react-toastify'

function ManagePortfolio() {
  const {allPortfolio, setDetectClick} = useContext(PortfolioContext)
  console.log(allPortfolio);
  const handleDelete = async (id)=>{
    const colRef = doc(collection(db, 'PortfolioInfo'), id)
    console.log(id);
    try{
      await deleteDoc(colRef)
      toast.success("Delete Successfull")
      setDetectClick(true)
    }catch(err){
      console.log(err.message);
      console.log(err.code);
    }
  }
  return (
    <>
      <div className="managePort">
        <div className="innerDiv">

        { 
          allPortfolio &&
          allPortfolio.map((elm, i) => {
            return(
              <div key={i} className="singlePortFolio">
                <div className="image">
                  <img src={elm.image} alt="" />
                </div>
                <div className="portTitle">
                  <h4>
                    {elm.details.portTitle}
                  </h4>
                </div>
                <div className="actions">
                  <button>Edit</button>
                  <button onClick={()=>handleDelete(elm.id)}>Delete</button>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    </>
  )
}

export default ManagePortfolio