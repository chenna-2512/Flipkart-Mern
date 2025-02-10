// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignupPage'; // Ensure the path is correct
import LoginPage from './Components/LoginPage';
import LandingPage from './Utilities/LandingPage';
import Container from './Components/Container';
import Category from './Utilities/Category';
import Cart from './Utilities/Cart';
import Subcategory from './Utilities/Subcategory';
import Forgot from './Utilities/Forgot';
import Orders from './Utilities/Orders';
import Payment from './Components/Payment';
import Address from './Components/Address';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/address" element={<Address />} />
        <Route path="/container" element={<Container />} />
        <Route path="category/:title" element={<Category />} />
        <Route path="/:title" element={<Subcategory />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
