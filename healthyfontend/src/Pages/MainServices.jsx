import React from 'react'
import Services from '../Components/Services/Services'
import Banner from '../Components/Banner/Banner'
const MainServices = (props) => {
  return (
    <>
    <div className='MainSerice-container'>
      <div className="mainservice-banner">
      <Banner text={props.text} showButton={false} />
       
      </div>
      <hr />
      <div className="mainserice">
      <Services/>
      <hr /> 
         
      </div>
      </div> 
    
  
    
    
     
    </>
  )
}

export default MainServices