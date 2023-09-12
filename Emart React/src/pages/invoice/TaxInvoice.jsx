import React, { useState, useEffect } from 'react';
import './invoicecss.css';
import { useNavigate, useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import emailjs from'emailjs-com';



const TaxInvoice = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [productDetails, setProductDetails] = useState([]);

  const [loader,setLoader] = useState(false);

  const { invoiceID } = useParams();

  const navigate = useNavigate();

    function sendEmail(){
       

        emailjs.sendForm('service_rja4xyh','template_4joed0l',customerData,);
    }



  useEffect(() => {
    // Fetch invoice data from the API using invoiceID
    fetch(`http://localhost:8080/api/invoice/${invoiceID}`)
      .then((response) => response.json())
      .then((data) => {
        setInvoiceData(data);
        // Fetch customer details using custID from invoiceData
        fetch(`http://localhost:8080/api/Customer/${data.custID}`)
          .then((response) => response.json())
          .then((customer) => {
            setCustomerData(customer);
          })
          .catch((error) => {
            console.error('Error fetching customer data:', error);
          });

        // Fetch product details using invoiceID
        fetch(`http://localhost:8080/api/Invoicedetaails/InvoiceID/${invoiceID}`)
          .then((response) => response.json())
          .then((products) => {
            setProductDetails(products);
          })
          .catch((error) => {
            console.error('Error fetching product details:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching invoice data:', error);
      });

      



  }, [invoiceID]);

  if (!invoiceData || !customerData || productDetails.length === 0) {
    return <div>Loading...</div>;
  }

  const downloadPDF = () => {
    const capture = document.querySelector('.invoice-page');
    setLoader(true);
    html2canvas(capture).then((canvas)=> {
        const imgData = canvas.toDataURL('img/png');
        const doc = new jsPDF('P','mm','a4');
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData,'PNG',0,0,componentWidth,componentHeight);
        setLoader(false);
        doc.save('receipt.pdf');
    } )

    const custId = parseInt(localStorage.getItem("custId"));
      fetch(`http://localhost:8080/api/Cart/Deletecust/${custId}`, {
        method: 'DELETE',
      })
        .then(() => {
          console.log('Cart items deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting cart items:', error);
          // Handle error cases here
        });
  }
  
  const goBack = () => {
    
    navigate('/cart');
  }

  return (
    <>
    <div className="invoice-page">
        
      <div className="invoice-header">
      <h1>E-Mart Solutions</h1><hr/><br/>
        <h1>INVOICE</h1>
        <div className="invoice-date">{invoiceData.invoiceDate}</div>
      </div>
      <div className="invoice-customer-details">
      <div className="customer-field">
          <span>Customer Name:</span> {customerData.custName}
        </div>
        <div className="customer-field">
          <span>Customer Address:</span> {customerData.custAddress}
        </div>
        <div className="customer-field">
          <span>Customer Phone:</span> {customerData.custPhone}
        </div>
        <div className="customer-field">
          <span>Customer Points:</span> {customerData.points}
        </div>
      </div>
      <div className="invoice-products">
        {productDetails.map((product) => (
          <div className="product" key={product.prodID}>
            <div className="product-details">
              <div>Product Name: {product.prodName}</div>
              <div>Product ID: {product.prodID}</div>
              <div>MRP: ₹{product.mrp.toFixed(2)}</div>
              <div>Points Redeem: {product.pointsRedeem}</div>
              <div>Card Holder Price: ₹{product.cardHolderPrice.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="invoice-totals">
      <div className="invoice-field">
          <span>Total Amount:</span> ₹{invoiceData.totalAmt.toFixed(2)}
        </div>
        <div className="invoice-field">
          <span>Delivery Charge:</span> ₹{invoiceData.deliveryCharge.toFixed(2)}
        </div>
        <div className="invoice-field">
          <span>Tax:</span> ₹{invoiceData.tax.toFixed(2)}
        </div>
        <div className="invoice-field">
          <span>Total Bill:</span> ₹{invoiceData.totalBill.toFixed(2)}
        </div>
        </div>

        

      </div>

      <div className="buttons">
        <button className="confirm-button" onClick={downloadPDF} 
            disabled = {!(loader===false)}
        >{loader? (<span>Sending Mail</span>) : (<span>Confirm</span>)}</button>
        <button className="back-button"  onClick={goBack}>Back</button>
        </div>
      
    </>
  );
};

export default TaxInvoice;
