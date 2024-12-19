import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setButtonInactive,
  setRegistryInactive,
} from "../../features/button/buttonModal";
import CloseButton from "react-bootstrap/CloseButton";

import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";

export default function Login() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_ROUTE_LOGIN,
        form
      );

      localStorage.setItem("token", response.data.token);

      const role = response.data.usuario.esAdmin;
      if (role) {
        setRole(role);
      } else {
        setRole(null);
      }
     } catch (error) {
      if (error) {
        setError("Usuario no encontrado o credenciales inválidas");
      } else {
        setError(null);
      }
    }
  };
  
  if (role == "admin") {
    dispatch(setButtonInactive());
    navigate("/adminView");
    window.location.reload()
  } else if (role == "user") {
    dispatch(setButtonInactive());
    navigate("/home");
    window.location.reload()
  }
   
  return (
    <Container className="mt-0">
      <Row className="justify-content-center">
        <Col>
          <div className="content-btn-close text-end">
            <CloseButton
              size="sm"
              className="btn-close btn-close-white"
              onClick={() => dispatch(setButtonInactive())}
            ></CloseButton>
          </div>
          <h2 className="text-center mb-4">Iniciar sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="form-login"
          >
            <Form.Group
              className="content-label-input mb-3"
              controlId="formEmail"
            >
              <Form.Label className="">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="content-label-input">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              className="submit-btn w-100"
              variant="primary"
            >
              CONTINUAR
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Button
              variant="link"
              onClick={() => dispatch(setRegistryInactive())}
              className="text-decoration-none"
            >
              CREAR CUENTA
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
