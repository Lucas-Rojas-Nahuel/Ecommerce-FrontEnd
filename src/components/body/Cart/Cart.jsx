 
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../../slices/cartSlice";
import { NavLink, useNavigate } from "react-router-dom";

import { setButtonActive } from "../../../features/button/buttonModal";
import {
  Button,
  Table,
  Container,
  Row,
  Col,
  Form,
  Alert,
} from "react-bootstrap";
import { useState } from "react";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const total = cart.reduce(
    (total, item) => total + item.precio * item.quantity,
    0
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  

  const [showAlert, setShowAlert] = useState(false);

  const handleAccess = () => {
    if (isAuthenticated) {
      navigate(`/product-orders`);
    } else {
      setShowAlert(true); // Muestra la alerta
    }
  };


  return (
    <Container className="cart w-100 vh-100" style={{ maxWidth: "2800px" }}>
      {/* <article className="adaptable"> */}
      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Fondo semi-transparente
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050, // Para asegurarse de que esté encima de otros elementos
          }}
        >
          <Alert
            variant="primary"
            onClose={() => setShowAlert(false)}
            dismissible
            className="mt-3 text-center"
            style={{
              maxWidth: "500px",
              textAlign: "center",
            }}
          >
            <h4 className="alert-heading">¡Atención!</h4>
            <p>Usuario no registrado, por favor inicie sesión.</p>
            <Button
              variant="primary"
              onClick={() => {
                dispatch(setButtonActive());
                setShowAlert(false);
              }}
            >
              Iniciar Sesión
            </Button>
          </Alert>
        </div>
      )}
      {!cart.length ? (
        <Alert
          variant="info"
          className="text-center d-flex flex-column justify-content-center align-items-center h-100"
        >
          <h4>Carrito Vacío</h4>
          <NavLink to="/products">
            <Button variant="primary" className=" mt-3">
              Seguir Comprando
            </Button>
          </NavLink>
        </Alert>
      ) : (
        <div className="content-principal">
          <h3 className="my-4 text-center">Carrito de Compras</h3>
          <div style={{ maxHeight: "372px", overflowY: "auto" }}>
            <Table
              className="cartable"
              variant="dark"
              striped
              bordered
              hover
              responsive="sm"
            >
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>$ {item.precio.toLocaleString("es-ES")}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                        style={{ maxWidth: "80px" }}
                      />
                    </td>
                    <td>
                      $ {(item.quantity * item.precio).toLocaleString("es-ES")}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        <i className="fi fi-ss-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Row className="justify-content-between align-items-center my-2">
            <Col md={6}>
              <Button
                variant="secondary"
                onClick={handleClearCart}
                className="btn-cart w-100 "
              >
                Vaciar el carrito
              </Button>
            </Col>
            <Col md={6}>
              <h4 className="text-end">
                Total: $ {total.toLocaleString("es-ES")}
              </h4>
            </Col>
          </Row>
          <Row className="mt-4 my-2">
            <Col md={6}>
              <NavLink to="/products">
                <Button variant="primary" className="btn-cart w-100 mb-2">
                  Seguir Comprando
                </Button>
              </NavLink>
            </Col>

            <Col md={6}>
              <Button
                variant="success"
                onClick={handleAccess}
                className="btn-cart w-100 mb-2"
              >
                Realizar pedido
              </Button>
            </Col>
          </Row>
        </div>
      )}
      {/*  </article> */}
    </Container>
  );
}
