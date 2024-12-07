
import "./cardProducts.css";
import PropTypes from "prop-types";


// eslint-disable-next-line react/prop-types
export default function CardProducts({ id ,imagen, nombre, precio }) {
  return (
    <>
      <div to={`/products/${id}`} className="prueba">
        <div className="container">
          <img src={imagen} className="img-product" alt="" />

          <h3 className="title-product">{nombre}</h3>
          <div className="container-price-btn">
            <p>${precio}</p>
            <button >
              <i className="fi fi-sr-shopping-cart-add"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

CardProducts.propTypes = {
  filters: PropTypes.shape({
    
  }),
};
