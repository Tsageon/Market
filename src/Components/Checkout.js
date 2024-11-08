import React from 'react';
import './Checkout.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const { item, quantity } = location.state || {}; 
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    alert(`Purchase Confirmed! Total amount: R${calculateTotal()}...No true payment methods available yet`);
    navigate('/home');
  };

  if (!item || !quantity) {
    return <p>No checkout data available.</p>; 
  }

  const calculateTotal = () => {
    return (item.Price * quantity).toFixed(2);
  };

  return (
    <div className="checkout-overlay">
      <div className="checkout">
        <h2>Confirm Purchase</h2>
        <div className="checkout-card">
          <img className="checkout-img" src={item.Image} alt={item.Name || 'Product Image'} />
          <div className="checkout-details">
            <h4>{item.Name || 'Unnamed Product'}</h4>
            <p>{item.Description || 'No description available'}</p>
            <p>Price: R{item.Price || 'N/A'}</p>
            <p>Quantity: {quantity}</p>
            <p>Total: R{calculateTotal()}</p>
          </div>
        </div>
        <div className="checkout-actions">
          <button className="back-button" onClick={() => navigate(-1)}>Back</button>
          <button className="confirm-button" onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;