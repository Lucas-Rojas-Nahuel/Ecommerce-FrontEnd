/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import "./cardProducts.css";
import PropTypes from "prop-types";
import { addCart } from "../../../../../slices/cartSlice";
import { NavLink } from "react-router-dom";

import { Card, Button } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
export default function CardProducts({ id, imagen, nombre, precio }) {
  const dispatch = useDispatch();
  const handleAddCart = () => {
    dispatch(addCart({ id, imagen, nombre, precio }));
  };

  // Verifica si `imagen` es un array o una cadena de texto
  const images = Array.isArray(imagen) ? imagen : [imagen];

  return (
    <Card className="prueba shadow-sm mb-3" bg="secondary">
      <NavLink to={`/products/${id}`} className="container">
        <Card.Img
          src={images[0]}
          className="img-product"
          variant="top"
          alt="Product"
        />
      </NavLink>
      <Card.Body>
        <NavLink to={`/products/${id}`} className={"text-decoration-none"}>
          <Card.Title className="title-product text-center">
            {nombre}
          </Card.Title>
        </NavLink>
      </Card.Body>
      <Card.Text className="text-center text-muted">
        ${precio.toLocaleString("es-ES")}
      </Card.Text>
      <div className="d-flex justify-content-center">
        <Button variant="success" onClick={handleAddCart}>
          <i className="fi fi-sr-shopping-cart-add"></i>
        </Button>
      </div>
    </Card>
  );
}

CardProducts.propTypes = {
  filters: PropTypes.shape({}),
  imagen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};
