import React from 'react'

function Overlay({children}){
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-30 text-white text-2xl font-projTitle flex items-center justify-center">
      {children}
    </div>
  )
}

export default Overlay