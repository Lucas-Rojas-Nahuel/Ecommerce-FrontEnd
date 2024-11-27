import CategoryOption from "../menuContent/categoryOption";
import PropTypes from "prop-types";
import './navLinkResponsi.css'
import useUserRole from "../../../hooks/users/useUserRole";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavLinkResponsi({isMenuVisible, handlerClickCategori, isActiveCategori}) {
  const { role } = useUserRole();
  
  const [isRole, setIsRole]= useState(false)

  useEffect(()=>{
    if(role === 'user'){
      setIsRole(true)
    }else if(role === 'admin'){
      setIsRole(false)
    }else{
      setIsRole(true)
    }
  }, [role])

  const renderContent = () => {
    if (role === "user") {
      return (
        <>
          <li className="nav-list-responsi">
            <NavLink to="/home">Inicio</NavLink>
          </li>
          <li className="nav-list-responsi">
            <NavLink to="/products">Productos</NavLink>
          </li>
          <li className="nav-list-responsi">
            <NavLink to="/offer">Ofertas</NavLink>
          </li>
          <li className="nav-list-responsi">
            <NavLink to="/sell">Vender</NavLink>
          </li>
          <li className="nav-list-responsi">
            <NavLink to="/wishList">Lista de Deseos</NavLink>
          </li>
        </>
      );
    } else if (role === "admin") {
      return (
        <>
          <li className="nav-list-responsi">
            <NavLink to="/controlPanel">Panel de Control</NavLink>
          </li>
          <li className="nav-list-responsi">
            <NavLink to="/manageProducts">Gestionar Productos</NavLink>
          </li>
          <li className="nav-list-responsi">
            <NavLink to="/manageOrders">Gestionar Ordenes</NavLink>
          </li>
          <li className="nav-list-responsi">
            <NavLink to="/manageUsers">Administrar Usuarios</NavLink>
          </li>
          <li className="nav-list-responsi">
            <NavLink to="/manageDiscounts">Gestionar Descuentos</NavLink>
          </li>
          <li className="nav-list-responsi">
            <NavLink to="/manageReviews">Gestionar Revisiones</NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-list-responsi">
            <NavLink to="/home">Inicio</NavLink>
          </li>
          <li className="nav-list-responsi">
            <NavLink to="/products">Productos</NavLink>
          </li>
          <li className="nav-list-responsi">
            <NavLink to="/offer">Ofertas</NavLink>
          </li>
          <li className="nav-list-responsi">
            <NavLink to="/contactUs">Contáctanos</NavLink>
          </li>
        </>
      );
    }
  }; 

  return (
    <nav className={`nav-link-responsi ${isMenuVisible}`}>
      <ul className="content-nav-responsi">
        <li className={isRole?'nav-list-responsi': 'nav-list-responsi-none'}>
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

        {renderContent()}
      </ul>
    </nav>
  );
}

NavLinkResponsi.propTypes = {
    isMenuVisible: PropTypes.bool.isRequired,
    handlerClickCategori: PropTypes.func.isRequired,
    isActiveCategori: PropTypes.bool.isRequired
}