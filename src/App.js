import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Bars } from "react-loader-spinner";
import { useDispatch } from 'react-redux';
import { setUser } from './Redux/authSlice';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Forgotpassword from './Components/Forgotpassword';
import Home from './Components/Home';
import Cart from './Components/Cart';
import ProductSummary from './Components/Product';
import Checkout from './Components/Checkout';
import Admin from './Components/Admin';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <Bars display="flex" justify-content="center" align-items="center" height="80" width="80" color="#4fa94d" ariaLabel="loading-indicator" />
      </div>
    );
  }

  
  return (

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/admin" element={<Admin />}  />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart  />} />
        <Route path="/product" element={<ProductSummary />} />
        <Route path="/checkout" element={<Checkout />}  />
      </Routes>
    </Router>

  );
}

export default App;