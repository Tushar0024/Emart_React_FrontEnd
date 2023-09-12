import React, { useState } from 'react';
import "./invoicecss.css";

const Invoice = () => {
  const [customerName, setCustomerName] = useState('John Doe');
  const [customerAddress, setCustomerAddress] = useState('123 Main St');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', quantity: 2 },
    { id: 2, name: 'Product 2', quantity: 1 },
  ]);

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleProductRemove = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleConfirm = () => {
    const invoiceDetails = {
      customerName,
      customerAddress,
      invoiceDate,
      products,
    };
    alert('Invoice confirmed with the following details:\n\n' + JSON.stringify(invoiceDetails, null, 2));
  };

  return (
    <div className="unique-invoice-page">
      <h1>Invoice</h1>
      <div className="unique-customer-details">
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Customer Address"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
        <input
          type="date"
          placeholder="Invoice Date"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
        />
      </div>
      <div className="unique-product-list">
        {products.map((product, index) => (
          <div className="unique-product" key={product.id}>
            <input
              type="text"
              value={product.name}
              onChange={(e) => handleProductChange(index, 'name', e.target.value)}
            />
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))}
            />
            <button onClick={() => handleProductRemove(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button className="unique-confirm-button" onClick={handleConfirm}>Confirm</button>
    </div>
  );
}

export default Invoice;
