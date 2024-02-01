import './App.css'
import NavBar from './Components/NavBar/NavBar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import DietRecomd from './Pages/DietRecomd'
import FoodImage from './Pages/FoodImage'
import Recipe from './Pages/Recipe'
import AboutUs from './Pages/AboutUs'
import Services from './Pages/MainServices'
import ContactUs from './Pages/ContactUs'
import Footer from './Components/Footer/Footer'
function App() {
 const bannerHomeText = '"Prioritize a healthy lifestyle"';
 const bannerServiceText = '“Your diet is a bank account. Good food choices are good investments.”';
 const bannerHealthText = '“Eat breakfast like a king, lunch like a prince, and dinner like a pauper.”'
 const bannerRecpeText = "“Love yourself enough to live a healthy lifestyle”"
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home text={bannerHomeText} />}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path='/service' element={<Services text={bannerServiceText}/>}/>
      <Route path='/contact' element={<ContactUs/>}/>
      <Route path='/dietrecomdention' element={<DietRecomd text={bannerHealthText}/>}/>
      <Route path='/recipe' element={<Recipe text={bannerRecpeText}/>}/>
      
     </Routes>
     <Footer/>   
    </BrowserRouter>
    </>
  )
}

export default App
