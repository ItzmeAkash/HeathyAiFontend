import React, { useState } from 'react'
import Banner from '../Components/Banner/Banner'
import './Css/FoodImage.css'

const FoodImage = (props) => {
  const [image, setImage] =  useState(null);
  
  //Image Uploading Function
  const handleImageUpload = (event) =>{
    const selectedImage = event.target.files[0];
   
    const reader = new FileReader();

    reader.onload = ()=> {
      if (reader.readyState === 2){
        setImage(reader.result);
      }
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  }
  return (
    <>
    
    <div className='foodimage-main-container'>
      <div className="banner-container">
      <Banner text = {props.text}/>
        
      </div>
        <div className="foodimge">
        <h1>Food Image Classification</h1>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
         {image && (
          
          <div className="uploaded-image-container">
            
            <img src={image} alt="uploaded" className='uploaded-image'/>
            
            <div className="nutriations">
            <h1>Food Name</h1>

                <table className="nutrition-table">
                  <tr>
                    <th>Nutritions</th>
                    <th>Value</th>
                  </tr>
                  <tr>
                    <td>Protein</td>
                    <td>20g</td>
                  </tr>
                  <tr>
                    <td>Fat</td>
                    <td>10g</td>
                  </tr>
                  <tr>
                    <td>Carbohydrates</td>
                    <td>30g</td>
                  </tr>
                  <tr>
                    <td>Fiber</td>
                    <td>5g</td>
                  </tr>
                  
                </table>
            </div>
  

          </div>
         )}
          </div>     
    </div>
    
    
    </>
  )
}

export default FoodImage