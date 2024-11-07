import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Cart.css' 

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.Price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/product'); 
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id}>
              <h4>{item.Name}</h4>
              <img src={item.Image} alt='s'/>
              <p>Price: R{item.Price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: R{(item.Price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <h3>Total Price: R{calculateTotalPrice()}</h3>
          <button onClick={handleCheckout}>Proceed to Product Summary</button>
        </>
      )}
    </div>
  );
};

export default Cart;