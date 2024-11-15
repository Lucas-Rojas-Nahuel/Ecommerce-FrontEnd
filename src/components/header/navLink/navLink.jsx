import CategoryOption from "../menuContent/categoryOption";
import './navLink.css'
import { NavLink } from "react-router-dom";

export default function NavLinkk() {
  return (
    <nav className="nav-link">
      <div className="menu">
        <button className="btn-menu">
          <span>Categorias</span>
        </button>
        <ul className="menu-content">
          <CategoryOption />
          <CategoryOption />
          <CategoryOption />
          <CategoryOption />
        </ul>
      </div>

      <ul className="content-nav">
        <li className="nav-list">
          <NavLink to="/home">Inicio</NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/products">Productos</NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/offer">Ofertas</NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/fashion">Moda</NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/household">Electrodomestico</NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/sell">Vender</NavLink>
        </li>
      </ul>
    </nav>
  );
}
