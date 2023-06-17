import React from 'react'
import { useGlobalDatahomeimg } from '../../../../global'

const AboutAdmin = () => {
  const [globalImage, setGlobalImage]=useGlobalDatahomeimg()
   console.log(globalImage.url);
  return (
    <div style={{width:"200px", height:"200px",margin:"30px auto"}}>
    <img style={{width:"100%",height:"100%",zIndex:"999"}} src={globalImage} alt="" />
    </div>
  )
}

export default AboutAdmin