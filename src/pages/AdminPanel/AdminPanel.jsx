import { Container, Row, Col, Card, Button,Alert,
  Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
const AdminPanel = () => {
  const { profile, loading, error } = useSelector((state) => state.auth);
   
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");

    window.location.reload();
  };


  if (loading) return <container className='vh-100 vw-100 d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></container> 
  if (error)
    return (
      <Alert variant="danger">
        Error: {error.message || "Error desconocido"}
      </Alert>
    );
  return (
    <Container
      fluid
      className="py-5 d-flex flex-column justify-content-center align-items-center bg-light text-center"
    >
      <Row className="w-100">
        <Col>
          <h1 className="display-4 text-primary mb-4">
            ¡Bienvenido, {profile.nombre}!
          </h1>
          <p className="lead">
            Estás en el panel de administrador. Aquí puedes gestionar usuarios,
            visualizar reportes y administrar el sistema.
          </p>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">Gestión de Usuarios</Card.Title>
              <Card.Text>
                Administra los usuarios registrados en el sistema.
              </Card.Text>
              <Button variant="primary" href="/manageUsers">
                Gestionar Usuarios
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">Gestión de productos</Card.Title>
              <Card.Text>
                Administra los productos registrados en el sistema.
              </Card.Text>
              <Button variant="success" href="/manageProducts">
                Gestionar Productos
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">Cerrar Sesión</Card.Title>
              <Card.Text>
                Sal de tu sesión de administrador de forma segura.
              </Card.Text>
              <Button variant="danger" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
