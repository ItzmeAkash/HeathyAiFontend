import React from 'react'
import Banner from '../Components/Banner/Banner'

const AboutUs = (props) => {
  return (
    <>
       <div className='aboutus-container'>
       <Banner text={props.text}/>

    </div>
    </>
    
  )
}

export default AboutUs