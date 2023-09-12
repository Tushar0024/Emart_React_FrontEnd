import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage1 = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [isCardHolder, setIsCardHolder] = useState(false);
  const [points, setPoints] = useState(0);
  const [isRedeemingPoints, setIsRedeemingPoints] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [totalAmount,setTotalAmount] = useState(0);

  const navigate = useNavigate();
console.log('carditems', cartItems)
console.log('prod details', productDetails)
const fetchCartItemsFun = async () => {
  const res = await fetch(`http://localhost:8080/api/Cart/cust/` + localStorage.getItem("custId"))
      .then((response) => response.json())
      .then((data) => {
        return data;
        setCartItems(data);
      
        //calculateTotalAmount(data);
        
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
      setCartItems(res)
      console.log('cart items', res);
      //calculateTotalAmount(res)
      const productIDs = [...new Set(res.map(item => item.prodID))];
        await fetchProductDetails(productIDs);
        calculateTotalAmount(res)
} 

  useEffect(() => {
    if (localStorage.getItem("islogin") !== "true") {
      navigate(`/login`);
      return;
    }

    // Fetch cart items
    fetchCartItemsFun();

    fetch('http://localhost:8080/api/Customer/isCardHolder/' + localStorage.getItem("custId"))
      .then((res) => res.json())
      .then((data) => {
        setIsCardHolder(data);
      })
      .catch((error) => {
        console.error("Error fetching isCardHolder status:", error);
      });

  }, []);

  
  useEffect(() => {

    if (isCardHolder) {
      fetch('http://localhost:8080/api/Customer/points/' + localStorage.getItem("custId"))
        .then((res) => res.json())
        .then((data) => {
          setPoints(data);
        })
        .catch((error) => {
          console.error("Error fetching isCardHolder status:", error);
        });

      
      const productIDs = [...new Set(cartItems.map(item => item.prodID))];
      fetchProductDetails(productIDs);
    }
  }, [cartItems, isCardHolder]);

  const fetchProductDetails = async (productIDs) => {
    console.log('prodID',productIDs);
    const productDetailsFetchPromises =await productIDs.map(id => (
      fetch(`http://localhost:8080/api/product/${id}`)
        .then(response => response.json())
        .then(data => ({ id, details: data }))
    ));

    Promise.all(productDetailsFetchPromises)
      .then(detailsData => {
        const detailsObject = detailsData.reduce((obj, { id, details }) => {
          obj[id] = details;
          return obj;
        }, {});
        setProductDetails(detailsObject);
      })
      .catch(error => {
        console.error("Error fetching product details:", error);
      });
  };

  const handleIncrement = (index) => {
  const updatedCartItems = [...cartItems];
  updatedCartItems[index].qty += 1;
  setCartItems(updatedCartItems);

  // Update the quantity in the database
  updateCartItemQuantity(updatedCartItems[index].cartID, updatedCartItems[index].qty);
};

const handleDecrement = (index) => {
  const updatedCartItems = [...cartItems];
  if (updatedCartItems[index].qty > 1) {
    updatedCartItems[index].qty -= 1;
    setCartItems(updatedCartItems);

    // Update the quantity in the database
    updateCartItemQuantity(updatedCartItems[index].cartID, updatedCartItems[index].qty);
  }
};

const updateCartItemQuantity = async(cartItemId, newQuantity) => {
  // Make an API call to update the quantity in the database
  await fetch(`http://localhost:8080/api/Cart/${newQuantity}/${cartItemId}`, {
    method: 'PUT'
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Quantity updated successfully:', data);
      fetchCartItemsFun()
    })
    .catch((error) => {
      console.error('Error updating quantity:', error);
    });
};


  const calculateTotalAmount = (items) => {
    console.log(items);

    let totalAmt = 0;
    items.forEach(item => {
      const product = productDetails[item.prodID];
      if (product) {
        totalAmt += isCardHolder ? (product.cardHolderPrice || product.offerPrice) * item.qty : product.offerPrice === 0 ? product.mrpPrice * item.qty : product.offerPrice * item.qty;
        
        //totalAmt += product.cardHolderPrice;
        console.log(totalAmt+"--------------")
      }
    });
    return setTotalAmount(totalAmt);
    
  };

  const handleRemove = (cartItemId) => {

    setCartItems(cartItems.filter(item => item.cartID !== cartItemId));
    // Make an API call to remove the item from the cart
    fetch(`http://localhost:8080/api/Cart/${cartItemId}`, {
      method: 'DELETE'
    })
  };

  const placeOrder = () => {
    let TM;
    if(isRedeemingPoints) {
      TM = totalAmount - points
    }else {
      TM = totalAmount;
    }

    const invoiceData = {
      
      totalAmt: TM / 1.18,   // Replace this with the actual total amount
      tax: (TM / 1.18) * 0.18,
      deliveryCharge: 100,
      custID: parseInt(localStorage.getItem("custId")),
      invoiceDate: new Date().toISOString().split('T')[0], // Get current date
      totalBill: TM + 100, // Total amount + deliveryCharge
    };
  
    // Make a POST request to create the invoice
    fetch('http://localhost:8080/api/invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Invoice created successfully:', data);
        // Create invoice details for each product in the cart


        cartItems.forEach(item => {
          const invoiceDetails = {
            mrp: productDetails[item.prodID]?.mrpPrice || 0,
            invoiceID: data.invoiceID, // Use the generated invoice ID
            prodID: item.prodID,
            pointsRedeem: productDetails[item.prodID]?.pointsRedeem || 0,
            cardHolderPrice: productDetails[item.prodID]?.cardHolderPrice || 0,
            prodName : productDetails[item.prodID]?.prodName || 0
          };
  
          // Make a POST request to create invoice details
          fetch('http://localhost:8080/api/Invoicedetaails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoiceDetails),
          })
            .then(response => response.json())
            .then(detailData => {
              console.log('Invoice detail created successfully:', detailData);
              // Perform any further actions here, if needed
            })
            .catch(error => {
              console.error('Error creating invoice detail:', error);
              // Handle error cases here
            });

            const timeoutId = setTimeout(() => {
              navigate('/invoice/'+data.invoiceID);
            }, 1500);
        });
  
        // Perform any further actions here, such as showing a success message
      })
      .catch(error => {
        console.error('Error creating invoice:', error);
        // Handle error cases here
      });

      setIsButtonClicked(true);

  };
  
  

  const handlecheck = (e,prodid,prodPoint, discPer) => {         //discPer
    
    const finalPrice =   productDetails[prodid]?.cardHolderPrice
    
    if(e.target.checked){
      if(points >= prodPoint) {
        if(discPer) {
          setTotalAmount(totalAmount - (finalPrice*discPer)/100)
        } else {
          setTotalAmount( totalAmount -  finalPrice)
        }
        setPoints(points - prodPoint);
      } else {
        window.alert("You dont have enough points")
        e.target.checked =false
      }
    }else 
    {
      setPoints(points + prodPoint);
      setTotalAmount(totalAmount + finalPrice)
    }
  } 
  
  useEffect (() => { 
    if(productDetails){
      
  calculateTotalAmount(cartItems)
    }
  },[productDetails])

  // const totalAmount2 = calculateTotalAmount(cartItems);

  // useEffect (()=> {
  //   setTotalAmount(totalAmount2);
  // },[totalAmount2])

  const trial = (item,index) => {
      return <li key={item.cartID}>
      <div>
        <div>Product ID: {item.prodID}</div>
        <div>Product Name: {productDetails[item.prodID]?.prodName}</div>
        {(isCardHolder) ? (<div>Card Holder Price : ₹{productDetails[item.prodID]?.cardHolderPrice.toLocaleString()}</div>) : (productDetails[item.prodID]?.offerPrice.toLocaleString()) === 0 ? (<div>MRP: {productDetails[item.prodID]?.mrpPrice.toLocaleString()}</div>) : (<div>Offer Price: {productDetails[item.prodID]?.offerPrice.toLocaleString()}</div>)}
        {(isCardHolder) ? (<div>Points to Redeem : {productDetails[item.prodID]?.pointsRedeem}</div>) : ""}
        <div>Quantity in Cart: {item.qty}</div>
        <div>
          <button onClick={() => handleIncrement(index)}>+</button>
          <button onClick={() => handleDecrement(index)}>-</button>
          <button className="remove-button" onClick={() => handleRemove(item.cartID)}>Remove</button>
          
          <input type="checkbox"  onChange={(e) => handlecheck(e, item.prodID ,productDetails[item.prodID]?.pointsRedeem, 50 )} /> //,discountPer
        </div>
      </div>
    </li>
  }

  return (
    <div className="cart-page">
      <h2>Your Cart {points}</h2>
      <ul className="cart-items">
        {cartItems.map((item, index) => trial(item,index))}
      </ul>
      <div>
        {(isCardHolder) ? (<input type="checkbox" checked={isRedeemingPoints} onChange={() => setIsRedeemingPoints(!isRedeemingPoints)}/> ) : ""}
    
            {(isCardHolder) ? ('Redeem Points') : ""} </div>

      <div>
  <p>
    Total Cart Amount: ₹
    {totalAmount && totalAmount}
  </p>
</div>
      
<div className="place-order">
        {cartItems.length > 0 && (
          <button
            className={`place-order-button ${isButtonClicked ? 'clicked' : ''}`}
            onClick={placeOrder}
          >
            Place Order
          </button>
        )}
      </div>

    </div>
  );
};

export default CartPage1;