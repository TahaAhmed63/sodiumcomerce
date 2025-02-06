import React from 'react'

const Columns = ({type,attributes,offset}) => {
if(type==="vc_column" && attributes?.offset ){

        const cleanClass = attributes?.offset?.replace(/vc_/g, "");



}
  return (
    <div className={`${cleanClass}`}>Columns</div>
  )
}

export default Columns