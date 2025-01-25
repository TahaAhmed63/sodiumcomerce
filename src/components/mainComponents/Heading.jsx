"use-client"
import React from 'react'

const Heading = (
    
    {head}
) => {
  return (
<div className="section-header">
    <div className="text-center">
    <h2 className="text-center uppercase text-center font-semibold text-2xl my-5">
            {head}
        </h2>
        
    </div>
</div>
  )
}

export default Heading