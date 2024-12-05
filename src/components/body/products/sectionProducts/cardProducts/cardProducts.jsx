import React, { useState } from "react";
import useProductCrud from "../../../../../hooks/products/useProductCrud";
import "./cardProducts.css";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
  

export default function CardProducts({filters}) {
  const {products, loading, error} = useProductCrud("http://localhost:3001/api/v1/productos")
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  React.useEffect(()=> {
    if(filters){
      let tempProducts = products;

      if(filters.categoria.length > 0){
        tempProducts = tempProducts.filter(product => filters.categoria.includes(product.categoria))
      }

      if(filters.marca.length > 0){
        tempProducts = tempProducts.filter(product => filters.marca.includes(product.marca))
      }

      setFilteredProducts(tempProducts);

    }else{
      setFilteredProducts(products);
    }
  }, [filters, products])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

 

  return (
      <>
      {filteredProducts.map((product) => (
        <Link to={`/products/${product._id}`} className="prueba" key={product._id}>
          <div className="container" >
            <img src={product.imagen} className="img-product" alt="" />

            <h3 className="title-product">{product.nombre}</h3>
            <div className="container-price-btn">
              <p>${product.precio}</p>
              <button>
                <i className="fi fi-sr-shopping-cart-add"></i>
              </button>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

CardProducts.propTypes = {
   filters: PropTypes.shape({
     categoria: PropTypes.arrayOf(PropTypes.string), 
     marca: PropTypes.arrayOf(PropTypes.string), 
    })
  }
