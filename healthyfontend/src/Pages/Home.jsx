import React, { useState } from 'react'
import Banner from '../Components/Banner/Banner'
import Healthy from '../Components/Healthy Benifits/Healthy'
import Services from '../Components/Services/Services'
import ContactUs from '../Components/ContactUs/ContactUs'


const Home = (props) => {

  
  return (
    <>  
  
        <Banner text={props.text} showButton={true}/>
        <Healthy/>
        <Services/>
        <ContactUs/>
    </>

  )
}

export default Home