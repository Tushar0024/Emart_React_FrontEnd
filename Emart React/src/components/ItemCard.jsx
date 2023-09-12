import React from 'react';
import { Card } from 'react-bootstrap';

const ItemCard = ({ title, img }) => {
  return (
    <div className='card-x' >
      <Card style={{ cursor: 'pointer' }} >
        <Card.Img variant="top" src={img} style={{ height: '300px', width: '250px' }}/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemCard;