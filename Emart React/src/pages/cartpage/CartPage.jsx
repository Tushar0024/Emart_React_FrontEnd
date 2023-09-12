import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 10, quantity: 2 },
    { id: 2, name: 'Product 2', price: 20, quantity: 1 },
    // Add more products here
  ]);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("islogin") === "true") {
      console.log(localStorage.getItem("islogin"))
    } else { navigate(`/login`);}

  }
  );



  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.map(item => (
        <div key={item.id} className="product-card">
          <h2>{item.name}</h2>
          <p>Price: ${item.price}</p>
          <p>Quantity: 
            <input
              type="number"
              value={item.quantity}
              onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
            />
          </p>
        </div>
      ))}
      <div className="total">
        <p>Total: ${calculateTotal()}</p>
      </div>
    </div>
  );
};

export default CartPage;
