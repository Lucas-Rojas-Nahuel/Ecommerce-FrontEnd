import { useDispatch } from "react-redux";
import "./cardProducts.css";
import PropTypes from "prop-types";
import { addCart } from "../../../../../slices/cartSlice";
import { NavLink } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function CardProducts({ id, imagen, nombre, precio }) {
  const dispatch = useDispatch();
  const handleAddCart = () => {
    dispatch(addCart({ id, imagen, nombre, precio }));
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  // Verifica si `imagen` es un array o una cadena de texto
  const images = Array.isArray(imagen) ? imagen : [imagen];
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  

  return (
    <>
      <div to={`/products/${id}`} className="prueba">
        <NavLink to={`/products/${id}`} className="container">
          <img src={images[currentIndex]} className="img-product" alt="Product" />
          <div className="navigation-buttons">
            {" "}
            <button onClick={handlePrev}>Anterior</button>{" "}
            <button onClick={handleNext}>Siguiente</button>{" "}
          </div>
          <h3 className="title-product">{nombre}</h3>
        </NavLink>
        <div className="container-price-btn">
          <p>${precio.toLocaleString("es-ES")}</p>
          <button onClick={handleAddCart}>
            <i className="fi fi-sr-shopping-cart-add"></i>
          </button>
        </div>
      </div>
    </>
  );
}

CardProducts.propTypes = {
  filters: PropTypes.shape({}),
  imagen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};
