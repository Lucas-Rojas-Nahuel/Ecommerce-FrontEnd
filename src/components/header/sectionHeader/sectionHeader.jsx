import "./sectionHeader.css";
import { Nav, Navbar, NavDropdown, Button, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { filterByText, setTextFilter } from "../../../slices/productsSlice";

import useUserRole from "../../../hooks/users/useUserRole";

import { logout } from "../../../slices/authSlice";
import { setButtonActive } from "../../../features/button/buttonModal";
import { useEffect, useState } from "react";

import renderContent from "../navLink/renderContent";
import logo from "../../../../public/icono2.png";

export default function SectionHeader() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.products.text);
  const allProducts = useSelector((state) => state.products.allProducts);
  const { profile } = useSelector((state) => state.auth);
  const { role } = useUserRole();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [show, setShow] = useState(false);

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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleShow = () => setShow(!show);
  return (
    <Navbar
      fixed="top"
      expand="lg"
      data-bs-theme="dark"
      className="w-100 border-box p-0 bg-color"
    >
      <div className="d-flex border-box justify-content-between align-items-center px-2 w-100">
        <Navbar.Brand
          href={role === "admin" ? "/adminView" : "/"}
          className="text-white fw-bold"
        >
          {windowWidth < 600 ? (
            <img
              src={logo}
              alt="CompuGamer Logo"
              style={{ width: "40px", height: "auto", marginRight: "10px" }}
            />
          ) : (
            <>
              <img src={logo} alt="CompuGamer Logo" className="navbar-logo " />
              CompuGamer
            </>
          )}
        </Navbar.Brand>
        {role != "admin" && (
          <div className={`content-searches flex-grow-1   align-items-center`}>
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
        )}

        <div
          className="my-lg-0 custom-width d-flex justify-content-between align-items-center flex-nowrap"
          style={{ maxHeight: "60px" }}
        >
          <Button
            variant="link"
            onClick={toggleShow}
            className="me-1 btn-search text-decoration-none"
          >
            <i className="fi fi-rs-search"></i>
          </Button>
          {profile ? (
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
          ) : (
            <Button
              variant=""
              className="d-flex justify-content-center align-items-center me-2  "
              onClick={(e) => {
                e.preventDefault();
                dispatch(setButtonActive());
              }}
            >
              <i className="fi fi-sr-user"></i>
              <p className="m-0">Ingresar</p>
            </Button>
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
          <img src={logo} alt="CompuGamer Logo" className="navbar-logo " />
          <Offcanvas.Title>CompuGamer</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="bg-dark">
          {role != "admin" && (
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
          )}

          <nav>
            <ul className="list-unstyled">{renderContent(role)}</ul>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
