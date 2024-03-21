import './App.css';
import { Fragment } from 'react';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import DietRecomd from './Pages/DietRecomd';
import FoodImage from './Pages/FoodImage';
import Recipe from './Pages/Recipe';
import AboutUs from './Pages/AboutUs';
import Services from './Pages/MainServices';
import ContactUs from './Pages/ContactUs';
import Footer from './Components/Footer/Footer';
import LoginSignup from './Pages/LoginSignup';
import RequireAuth from './RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const bannerTexts = {
    home: '"Prioritize a healthy lifestyle"',
    service: '“Your diet is a bank account. Good food choices are good investments.”',
    health: '“Eat breakfast like a king, lunch like a prince, and dinner like a pauper.”',
    recipe: '“Love yourself enough to live a healthy lifestyle”',
    bannerFoodImageText: '“An apple a day keeps the doctor away”',
  };

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home text={bannerTexts.home} />} />
          <Route path='/aboutus' element={<AboutUs text={bannerTexts.bannerFoodImageText} />} />
          <Route path='/service' element={<Services text={bannerTexts.service} />} />
          <Route path='/contact' element={<ContactUs text={bannerTexts.bannerFoodImageText} />} />

          {/* Protect Router */}
          <Route path='/' element={<RequireAuth />}>
            <Route path='/dietrecomdention' element={<DietRecomd text={bannerTexts.health} />} />
            <Route path='/recipe' element={<Recipe text={bannerTexts.recipe} />} />
            <Route path='/foodimageclassification' element={<FoodImage text={bannerTexts.bannerFoodImageText} />} />
          </Route>

          <Route path='/Login' element={<LoginSignup />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
