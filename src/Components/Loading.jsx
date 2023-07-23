import React from 'react'

function Loading() {
    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    }
  return (
    <>  
        <div style={style}>
            <div className="lds-facebook">
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Loading