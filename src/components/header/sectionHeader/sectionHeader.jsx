/* eslint-disable no-unused-vars */

import "./sectionHeader.css";
import PropTypes from "prop-types";
/* import { ContentLogo } from "./contentLogo";
import ContentSearches from "./contentSearches";
import { ContentButton } from "./contentButton"; */
import {   Nav, Navbar, NavDropdown } from "react-bootstrap";
import {   useNavigate } from "react-router-dom";
 
import { useDispatch, useSelector } from "react-redux";
import { filterByText, setTextFilter } from "../../../slices/productsSlice";
 
import useUserRole from "../../../hooks/users/useUserRole";

import { logout } from "../../../slices/authSlice";
import { setButtonActive,} from "../../../features/button/buttonModal";

export default function SectionHeader({
  isActive,
  onFocus,
  onBlur,
}) {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.products.text);
  const allProducts = useSelector((state) => state.products.allProducts);
  const { profile } = useSelector((state) => state.auth);
  const { role } = useUserRole();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  
  const filterBySearch = allProducts.filter((dato) =>
    dato.nombre.toLowerCase().includes(searchText.toLocaleLowerCase())
  );

  const handleChange = (e) => {
    dispatch(setTextFilter(e.target.value));
    dispatch(filterByText(filterBySearch));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
    window.location.reload();
  };

  return (
    <Navbar
      fixed="top"
      expand="lg"
      bg="success"
      data-bs-theme="dark"
      className="w-100"
    >
      <div className="d-flex justify-content-between align-items-center px-3 w-100">
        <Navbar.Brand href="#" className="text-white fw-bold">
          CompuGamer
        </Navbar.Brand>
        <div
          className={`content-searches flex-grow-1 align-items-center ${
            isActive ? "input-active" : ""
          }`}
        >
          <input
            className="search me-2 flex-grow-1 w-75"
            type="text"
            aria-label="Search"
            placeholder="Buscar productos"
            value={searchText}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />

          <label htmlFor="search" className="content-icon">
            <i className="fi fi-rs-search"></i>
          </label>
        </div>

        <Nav
          className=" my-2 my-lg-0 custom-width d-flex justify-content-between align-items-center flex-nowrap"
          style={{ maxHeight: "60px"}}
        >
          {profile ? (
            <>
              <NavDropdown className="btn-users"
                title={
                  <>
                    <i className="fi fi-sr-user"></i>
                    <span className="ms-2">{profile.nombre}</span>
                  </>
                }
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="/profile">Mi cuenta</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <button
              className="d-flex justify-content-center align-items-center"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setButtonActive());
              }}
            >
              <i className="fi fi-sr-user"></i>
              <p className="m-0">Ingresar</p>
            </button>
          )}
          {role != "admin" && (
            <Nav.Link href={"/cart"} className="shopping">
              <i className="fi fi-ss-shopping-cart"></i>
              {cartItemCount > 0 && (
                <span className="span-count">{cartItemCount}</span>
              )}
            </Nav.Link>
          )}
        </Nav>
      </div>
    </Navbar>
  );
}

SectionHeader.propTypes = {
  onClick1: PropTypes.func.isRequired, // Especifica que onClick1 es una función y es requerida
  onClick2: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
