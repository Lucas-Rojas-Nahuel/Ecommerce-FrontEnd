import { NavLink } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setButtonInactive,
  setRegistryActive,
} from "../../features/button/buttonModal";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";

export default function Register() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    nombre: "",
    username: "",
    email: "",
    password: "",
    isAdmin: "user",
  });

  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleRegister = async () => {
    setError("");

    if (form.password !== passwordRepeat) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_ROUTE_REGISTER,
        form
      );
      console.log(response);
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      dispatch(setRegistryActive());
    } catch (error) {
      console.error("Error en el registro", error);
      setError(
        error.response?.data?.message ||
          "Error en el registro. Inténtalo nuevamente."
      );
    }
  };

  return (
    <Container className="mt-0">
      <Row className="justify-content-center">
        <Col>
          <div className="d-flex justify-content-end">
            <CloseButton
              size="sm"
              className="btn-close btn-close-white"
              onClick={() => {
                dispatch(setButtonInactive());
                dispatch(setRegistryActive());
              }}
            ></CloseButton>
          </div>
          <h2>Registrarse</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="form-register"
          >
            <Row>
              <Col className="gap-2">
                <Form.Group
                  className="content-label-input mb-3"
                  controlId="name-register"
                >
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="content-label-input mb-3"
                  controlId="username-register"
                >
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Form.Group
                className="content-label-input mb-3"
                controlId="email-register"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Col className="gap-2">
                <Form.Group
                  className="content-label-input mb-3"
                  controlId="password-register"
                >
                  <Form.Label htmlFor="password-register">
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="content-label-input mb-3"
                  controlId="password-repeat-register"
                >
                  <Form.Label>Repetir Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordRepeat"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Button type="submit" variant="primary" className="w-100">
                REGISTRARME
              </Button>
            </Row>
          </Form>
          <p className="text-center mt-3">
            ¿Ya tenés cuenta?{" "}
            <NavLink
              className="text-primary"
              onClick={() => dispatch(setRegistryActive())}
            >
              Inicia sesión aca
            </NavLink>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
