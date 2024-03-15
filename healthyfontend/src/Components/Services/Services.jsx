import React from 'react'
import './Services.css'
import foodrecomdimage from '/food-recommednation.webp'
import foodrecipeimage from '/recipe.webp'
import foodclasimage from '/foodimageidentify.webp'
import { Link } from 'react-router-dom'

const Services = () => {
  
  return (

    <>
    <section id='serviceid'>

    <div  className='service-container'>
       <h1>Our Services</h1>

       { /* // Food recommednation container */}
       <div className="card-container">
       <div  className="card">
       <img src={foodrecomdimage} alt="" />
       <h2>Food recommendation</h2>
       <p>"Get personalized, healthy meal recommendations for your day, making it easy to enjoy delicious and nutritious meals with our fuss-free service."</p>
       <Link style={{textDecoration:'none'}} to='/dietrecomdention'><button onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}  >Click Here</button></Link>

       </div>
       <div className="card">
       { /*  Food Recipe Generator container */}
       
      

       <img src={foodrecipeimage} alt="" />
       <h2>Food Recipe Generator</h2>
       <p>"Explore tailored, nutritious recipes for your day with our recipe generator, making it effortless to savor delicious and healthy meals."</p>
       <Link style={{textDecoration:'none'}} to='/recipe' onClick={()=>{
         window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
       }}><button>Click Here</button></Link>

       
       </div>
       <div className="card">
       { /* // Food image Classification container */}
       <img src={foodclasimage} alt="" />
       <h2 id='foodimage'>Food Classification</h2>
       <p>"Explore precise food identification with our advanced image classification technology."</p>
       <Link style={{textDecoration:'none'}} to='/foodimageclassification'><button style={{marginTop:'41px'}}
       onClick={()=>{
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
       }}>Click Here</button></Link>
    
        
       </div>    
       </div>


    </div>
    </section>

    </>

  )
}

export default Services