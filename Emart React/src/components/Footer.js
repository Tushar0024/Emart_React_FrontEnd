import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
        <Container fluid>
          <Row className="py-2">
            <Col xs={12} md={4} className="mb-4">
              <h5>About Us</h5>
              <p>Welcome to eMart! We provide a wide range of products to meet your shopping needs.</p>
            </Col>
            <Col xs={12} md={4} className="mb-4">
              <h5></h5>
              <ul className="list-unstyled">
               
              </ul>
            </Col>
            <Col xs={8} md={4} className="mb-4">
              <h5>Contact Us</h5>
              <p>Email: contact@emart.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </Col>
          </Row>
          <hr />
          <div className="text-center py-3">
            &copy; {new Date().getFullYear()} eMart. All rights reserved.
          </div>
        </Container>
      </footer>

  );
}
