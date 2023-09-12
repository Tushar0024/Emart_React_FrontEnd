import Carousel from 'react-bootstrap/Carousel';

function Images() {
  return (
    <Carousel data-bs-theme="dark" >
      
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/image1.jpg"
          
          alt="Second slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
        <img
          className="d-block w-100"
          src="/Images/image2.jpg"
          alt="Third slide"
         
        />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/image3.jpg"
          alt="fourth slide"
          
          
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    
      
    </Carousel>
  );
}

export default Images