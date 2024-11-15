import PropTypes from "prop-types";
import './contentButton.css'

export function ContentButton({onClick ,isVisible}) {
  return (
    <div className="content-button">
      <button onClick={onClick} className="content-icon-search">
        {isVisible ? (
          <i className="fi fi-br-cross"></i>
        ) : (
          <i className="fi fi-br-search"></i>
        )}
      </button>
      <a href="" className="btn-users">
        <i className="fi fi-sr-user"></i>
        <p>Ingresar</p>
      </a>
      <a href="" className="shopping">
        <i className="fi fi-ss-shopping-cart"></i>
      </a>
    </div>
  );
}
ContentButton.propTypes = {
    onClick: PropTypes.func.isRequired, // Especifica que onClick1 es una función y es requerida
    isVisible: PropTypes.bool.isRequired,
};

