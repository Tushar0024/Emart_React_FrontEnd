import React, { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

const ProductPage = () => {

    const [product,setProduct] = useState([]); 
    const { id } = useParams();
    let navigate = useNavigate();


    useEffect(() => {
        fetch('http://localhost:8080/api/product/getCatId/' + id)
          .then(response => response.json())
          .then(data => {
            setProduct(data);
            console.log(data);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, [id]);

  return (
    <div style={{ margin: '20px', display: 'flex', padding: '2%' }}>
        {product?.map((i) => (
          <div key={i.prodID}   style={{ padding: '10px' }}>
            <ProductCard id={i.prodID} prodPoints={i.pointsRedeem} prodName={i.prodName} imgpath={i.imgpath} prodShortDesc={i.prodShortDesc} offerPrice={i.offerPrice} mrpPrice={i.mrpPrice} prodLongDesc={i.prodLongDesc} />
          </div>
           ))}
    </div>
  )
}

export default ProductPage