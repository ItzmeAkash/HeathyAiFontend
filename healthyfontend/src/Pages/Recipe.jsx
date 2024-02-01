import React from 'react'
import Banner from '../Components/Banner/Banner'

const Recipe = (props) => {
  return (
    <div className='recipe-container'>

      <Banner text={props.text}/>
    </div>
  )
}

export default Recipe