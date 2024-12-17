import "./sectionHeader.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { filterByText, setTextFilter } from "../../../slices/productsSlice";

import useUserRole from "../../../hooks/users/useUserRole";

import { logout } from "../../../slices/authSlice";
import { setButtonActive } from "../../../features/button/buttonModal";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import renderContent from "../navLink/renderContent";

export default function SectionHeader() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.products.text);
  const allProducts = useSelector((state) => state.products.allProducts);
  const { profile } = useSelector((state) => state.auth);
  const { role } = useUserRole();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

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
      data-bs-theme="dark"
      className="w-100 border-box p-0 bg-color"
    >
      <div className="d-flex border-box justify-content-between align-items-center px-2 w-100">
        <Navbar.Brand href="#" className="text-white fw-bold">
          CompuGamer
        </Navbar.Brand>
        <div className={`content-searches flex-grow-1 align-items-center`}>
          <input
            className="search me-2 flex-grow-1 w-75"
            type="text"
            aria-label="Search"
            placeholder="Buscar productos"
            value={searchText}
            onChange={handleChange}
          />

          <label htmlFor="search" className="content-icon">
            <i className="fi fi-rs-search"></i>
          </label>
        </div>

        <div
          className="my-lg-0 custom-width d-flex justify-content-between align-items-center flex-nowrap"
          style={{ maxHeight: "60px" }}
        >
          <Button
            variant="primary"
            onClick={toggleShow}
            className="me-1 btn-search"
          >
            <i className="fi fi-rs-search"></i>
          </Button>
          {profile ? (
            <>
              <NavDropdown
                className="btn-users d-flex align-items-center"
                title={
                  <div className="d-flex justify-content-center align-items-center">
                    <i className="fi fi-sr-user"></i>
                    <span className="ms-1">{profile.nombre}</span>
                  </div>
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
            <Nav.Link
              href={"/cart"}
              className="shopping d-flex justify-content-center align-items-center"
            >
              <i className="fi fi-ss-shopping-cart"></i>
              {cartItemCount > 0 && (
                <span className="span-count">{cartItemCount}</span>
              )}
            </Nav.Link>
          )}
        </div>
      </div>
      <Offcanvas show={show} onHide={toggleShow} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navegación</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="bg-dark">
          <div className="align-items-center d-flex mb-3">
            <input
              className="form-control me-2"
              type="text"
              aria-label="Search"
              placeholder="Buscar productos"
              value={searchText}
              onChange={handleChange}
            />

            <label htmlFor="search" className="content-icon">
              <i className="fi fi-rs-search text-white"></i>
            </label>
          </div>
          <nav>
            <ul className="list-unstyled">{renderContent(role)}</ul>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
