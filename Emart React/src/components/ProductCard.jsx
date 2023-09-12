import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({
  id,
  imgpath,
  prodName,
  prodPoints,
  prodLongDesc,
  prodShortDesc,
  offerPrice,
  mrpPrice
}) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({
    prodID: "",
    custID: "",
    qty: ""
  });

  const [showLongDesc, setShowLongDesc] = useState(false);

  const handleAddToCart = (id) => {
    if (localStorage.getItem("islogin") === "false") {
      navigate('/login');
      return;
    }

    setCart({
      prodID: id,
      custID: localStorage.getItem("custId"),
      qty: 1
    });
  };

  useEffect(() => {
    if (cart.prodID && cart.custID) {
      fetch("http://localhost:8080/api/Cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Cart data couldn't be sent.");
          }
          alert("Cart data sent successfully.");
        })
        .catch((error) => {
          alert("Item Already added in the cart");
        });
    }
  }, [cart]);

  const toggleLongDesc = () => {
    setShowLongDesc(!showLongDesc);
  };

  return (
    <div className="product-card">
      <img src={imgpath} alt={prodName} className="product-image" />
      <h3 className="product-name">{prodName}</h3>
      {showLongDesc ? (
        <p className="product-long-desc">{prodLongDesc}</p>
      ) : (
        <p className="product-short-desc">{prodShortDesc}</p>
      )}
      <div className="product-prices">
        <span className="product-offer-price">₹{offerPrice}</span>
        <span className="product-mrp-price">MRP - ₹{mrpPrice}</span>
        <span className='product-offer-price'>Points - {prodPoints}</span>
      </div>
      {prodLongDesc && (
        <p className="show-more" onClick={toggleLongDesc}>
          {showLongDesc ? 'Show Less' : 'Show More'}
        </p>
      )}

      <div className="product-buttons">
        <button className="add-to-cart-button" onClick={() => handleAddToCart(id)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  imgpath: PropTypes.string.isRequired,
  prodName: PropTypes.string.isRequired,
  prodLongDesc: PropTypes.string.isRequired,
  prodShortDesc: PropTypes.string.isRequired,
  offerPrice: PropTypes.number.isRequired,
  mrpPrice: PropTypes.number.isRequired
};

export default ProductCard;



