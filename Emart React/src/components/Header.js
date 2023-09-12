
import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../util/util';

export function Header() {

  let navigate = useNavigate();
  const customLinkStyle = {
    fontFamily: 'Britannic Bold', // Replace with the chosen font from Google Fonts
    fontWeight: 'bold', // You can adjust the font weight as needed
    fontSize: '18px', // You can adjust the font size as needed
    cursor: 'pointer'
    // Add more styles if required
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src="/Images/MainLogo.png" width="80px" height="40px" alt="eMart Logo" />
          &nbsp; {/* Non-breaking space */}
          <img src="/Images/homelogo.png" width="40px" height="40px" alt="eMart Logo" />
          HOME
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {localStorage.getItem('islogin') ?
              <div style={customLinkStyle} onClick={() => { 
                handleLogout();
                navigate('/') }}>
                <img src="/Images/sign-in.png" width="30px" height="30px" alt="Login" />
                LOGOUT
              </div>
              :
              <Link to="login" style={customLinkStyle}>
                <img src="/Images/sign-in.png" width="30px" height="30px" alt="Login" />
                LOGIN
              </Link>}
          </Nav>
          <Form className="d-flex justify-content-center align-items-center ml-auto">
            {localStorage.getItem('islogin') ?
              <Link to="cart" id="b" style={customLinkStyle}>
                <img src="/Images/cartlogo.png" width="30px" height="30px" alt="Cart" />
                CART
              </Link>
              : null}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>



  );
}