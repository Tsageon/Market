import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart, addToCart } from "../Redux/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cartItems = useSelector((state) => state.cart.cart);
  
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add some items first.");
    } else {
      navigate("/checkout");
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(addToCart({ id, Quantity: newQuantity }));
    }
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.Image} alt={item.Name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.Name}</h4>
                  <p>Price: R{item.Price}</p>
                  <p>Quantity: 
                    <input
                      type="number"
                      min="1"
                      value={item.Quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="quantity-input"
                    />
                  </p>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <FaTrashAlt /> Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <button className="clear-cart-button" onClick={handleClearCart}>
              Clear Cart
            </button>
            <button className="checkout-button" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
