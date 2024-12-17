import { NavLink } from "react-router-dom";

export default function renderContent(role) {
  if (role === "user") {
    return (
      <>
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
          <NavLink to="/sell">Vender</NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/wishList">Lista de Deseos</NavLink>
        </li>
      </>
    );
  } else if (role === "admin") {
    return (
      <>
        <li className="nav-list">
          <NavLink to="/controlPanel">Panel de Control</NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/manageProducts">Gestionar Productos</NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/manageOrders">Gestionar Ordenes</NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/manageUsers">Administrar Usuarios</NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/manageDiscounts">Gestionar Descuentos</NavLink>
        </li>
        <li className="nav-list">
          <NavLink to="/manageReviews">Gestionar Revisiones</NavLink>
        </li>
      </>
    );
  } else {
    return (
      <>
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
          <NavLink to="/contactUs">Contáctanos</NavLink>
        </li>
      </>
    );
  }
}
