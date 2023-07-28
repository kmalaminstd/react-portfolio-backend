import React, { useContext } from 'react'
import { PortfolioContext } from '../context/Portfolio.context'

function ManagePortfolio() {
  const {allPortfolio} = useContext(PortfolioContext)
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
                  <button>Delete</button>
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