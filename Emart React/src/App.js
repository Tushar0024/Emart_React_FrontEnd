
import './App.css';
import {Header} from './components/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {Footer} from './components/Footer';
import Home from './pages/home/Home';
import Error from './pages/error/Error';
import Login1 from './pages/login/Login1';
import Register1 from './pages/register/Register1';
import SubCategory from './pages/subcategory/SubCategory';
import ProductPage from './pages/productPage/ProductPage';
import CartPage1 from './pages/cartpage/CartPage1';
import { useEffect, useState } from 'react';
import TaxInvoice from './pages/invoice/TaxInvoice';

function App() {

  useEffect(()=> {
    document.title = "E-Mart"
  })

  return (
    <div className="App">
     <Header/>
     
     <Routes>
        <Route index="Home" element={<Home/>}/>
        <Route path="login" element={<Login1 /> }/>
        <Route path="cart" element={ <CartPage1/> }/>
        <Route path = 'login/register' element = {<Register1/>}/>
        <Route path="/s/:id" element={<SubCategory/>} />
        <Route path="/p/:id" element={<ProductPage/>} />
        <Route path="/invoice/:invoiceID" element={<TaxInvoice/>} />
        <Route path='*' element={<Error/>}/>
      </Routes>


     <Footer/>
    </div>
  );
}

export default App;
