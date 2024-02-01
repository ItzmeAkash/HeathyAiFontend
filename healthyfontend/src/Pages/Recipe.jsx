import React from 'react';
import Banner from '../Components/Banner/Banner';
import './Css/Recipe.css';

const Recipe = (props) => {
  return (
    <div className='recipe-container'>
      <Banner text={props.text}/>
      <div className="recipe-main">
        <div className="recipe">
          <h1>Meet Your Personal AI-Powered Kitchen Assistant</h1>
          <p>Simply type a recipe idea or some ingredients you have on hand and DishGen's AI will instantly generate an all-new recipe on demand...</p>
        </div>
        <div className="recipe-input">
          <input type="text" placeholder='Chicken, Tomato, etc...'/>
          <button type='submit'>Generate</button>
        </div>
        <div className="recipe-result">
          <h1>Food Name</h1>
          <div className="recipeoutputs">
            <div className="recipe-ingredients">
              <h2>Ingredients</h2>
              <ol start="1">
                <li>Sugar</li>
                <li>Apple</li>
                <li>Apple</li>
  
              </ol>
            </div>
            <div className="recipe-instructions">
              <h2>Instructions</h2>
              <ol start="1">
                <li>Sugar</li>
                <li>Apple</li>
                <li>Apple</li>
                <li>Apple</li>
                <li>Apple</li>
                <li>Apple</li>
                <li>Apple</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
