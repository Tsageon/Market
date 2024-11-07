import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProductSummary.css'

const ProductSummary = () => {
  const location = useLocation();
  const { item } = location.state || {}; 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    navigate('/checkout', { state: { item, quantity } });
  };
  
  const handleBack = () => {
    navigate('/home')
  }

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10) || 1);
  };

  const handleAddCart = () => {
    dispatch(addToCart({ ...item, quantity }));
    alert(`${item.Name} has been added to your cart!`);
  };

  const calculateTotal = () => {
    return (item.Price * quantity).toFixed(2);
  };

  if (!item) {
    return <p>No product data available.</p>; 
  }

  return (
    <div className="product-summary-overlay">
        <button className='BaCk' onClick={handleBack}>Back</button>
      <div className="product-summary">
        <div className="product-card">
          <img className="Product-img" src={item.Image} alt={item.Name || 'Product Image'} />
        </div>
        <div>
            <h4>{item.Name || 'Unnamed Product'}</h4>
            <p>{item.Description || 'No description available'}</p>
            <p className="price">Price: R{item.Price || 'N/A'}</p>
            <p>Stock Left: {item.StockLeft !== undefined ? item.StockLeft : 'N/A'} left</p>
            <p>Availability: {item.Availability || 'Unknown'}</p>
        </div>
        <div>
        </div>
        <div className='Buttons'>
        <label>
            Quantity:
            <input className='iinput'
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={item.StockLeft || 100}
            />
          </label>
          <p>Total: R{calculateTotal()}</p>
          <button className="buy-button" onClick={handleBuyNow}>Confirm Purchase</button>
          <button onClick={handleAddCart} className='add-button'>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;