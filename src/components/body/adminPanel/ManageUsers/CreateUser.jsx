import { useState } from "react";
import useUserCrud from "../../../../hooks/users/useUserCrud";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";


export default function CreateUser() {
  const { createUser } = useUserCrud(
    import.meta.env.VITE_REACT_APP_ROUTE_USUARIOS
  );
  const [formData, setFormData] = useState({
    nombre: "",
    username: "",
    email: "",
    password: "",
    esAdmin: "user",
  });
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      setSuccessMessage("Usuario creado con éxito.");
      setTimeout(() => {
        navigate("/manageUsers");
      }, 2000);
    } catch (error) {
      if (error) {
        setErrorMessage(
          "Hubo un problema al crear el usuario. Por favor, inténtalo de nuevo."
        );
      }
    }
};

  return (
    <div className="section-width">
      <Container className="my-5 container-create-user " >
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <h2 className="text-center mb-4">Crear Usuario</h2>
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form className="bg-dark text-white rounded p-4" onSubmit={handleSubmit}>
              <Form.Group controlId="nombre" className="mb-3">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingresa el nombre"
                  required
                />
              </Form.Group>
              <Form.Group controlId="username" className="mb-3">
                <Form.Label>Nombre de Usuario:</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ingresa el nombre de usuario"
                  required
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Correo Electrónico:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingresa el correo electrónico"
                  required
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingresa la contraseña"
                  required
                />
              </Form.Group>
              <Form.Group controlId="esAdmin" className="mb-4">
                <Form.Label>Rol:</Form.Label>
                <Form.Select
                  name="esAdmin"
                  value={formData.esAdmin}
                  onChange={handleChange}
                  required
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </Form.Select>
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Crear Usuario
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
