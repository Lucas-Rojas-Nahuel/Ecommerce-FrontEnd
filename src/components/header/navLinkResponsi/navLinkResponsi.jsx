import CategoryOption from "../menuContent/categoryOption";
import PropTypes from "prop-types";
import './navLinkResponsi.css'

export default function NavLinkResponsi({isMenuVisible, handlerClickCategori, isActiveCategori}) {
  return (
    <nav className={`nav-link-responsi ${isMenuVisible}`}>
      <ul className="content-nav-responsi">
        <li className="nav-list-responsi">
          <button onClick={handlerClickCategori} className="btn-menu-responsi">
            <i className="fi fi-rr-list"></i>
            <span>Categorias</span>
            {isActiveCategori ? (
              <i className="fi fi-rr-angle-small-up"></i>
            ) : (
              <i className="fi fi-rr-angle-small-down"></i>
            )}
          </button>
        </li>
        {isActiveCategori && (
          <ul
            className={`menu-content-responsi ${
              isActiveCategori ? "activeCategori" : ""
            }`}
          >
            <CategoryOption />
            <CategoryOption />
            <CategoryOption />
            <CategoryOption />
          </ul>
        )}

        <li className="nav-list-responsi">
          <a href="">Inicio</a>
        </li>
        <li className="nav-list-responsi">
          <a href="">Productos</a>
        </li>
        <li className="nav-list-responsi">
          <a href="">Ofertas</a>
        </li>
        <li className="nav-list-responsi">
          <a href="">Moda</a>
        </li>
        <li className="nav-list-responsi">
          <a href="">Electrodomestico</a>
        </li>
        <li className="nav-list-responsi">
          <a href="">Vender</a>
        </li>
      </ul>
    </nav>
  );
}

NavLinkResponsi.propTypes = {
    isMenuVisible: PropTypes.bool.isRequired,
    handlerClickCategori: PropTypes.func.isRequired,
    isActiveCategori: PropTypes.bool.isRequired
}