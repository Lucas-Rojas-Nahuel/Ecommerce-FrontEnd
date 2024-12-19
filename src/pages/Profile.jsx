import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Button, Modal,Spinner } from "react-bootstrap";
import avatar from "../../public/avatar.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useState } from "react";

export default function Profile() {
  const { profile } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
    window.location.reload();
  };

  const handleEdit = () => {
    setShow(true);
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-center"
    >
      {profile ? (
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <Card className="shadow-lg">
              <Card.Img
                variant="top"
                src={profile.avatar || avatar}
                alt="User Avatar"
                className="rounded-circle mx-auto mt-4"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{profile.nombre}</Card.Title>
                <Card.Text className="text-muted">{profile.email}</Card.Text>

                <Button variant="primary" className="me-2" onClick={handleEdit}>
                  Editar Perfil
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </Card.Body>
            </Card>
          </Col>
          {/* Modal para mostrar que la función está en proceso */}
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Función en Proceso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                La funcionalidad de edición de perfil está en proceso de
                desarrollo. Por favor, inténtalo más tarde.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      ) : (
        <container className='vh-100 vw-100 d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></container>
      )}
    </Container>
  );
}
