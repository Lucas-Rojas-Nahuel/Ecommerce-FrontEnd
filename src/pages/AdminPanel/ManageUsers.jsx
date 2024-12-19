import { useNavigate } from "react-router-dom";
import useUserCrud from "../../hooks/users/useUserCrud";
import usePagination from "../../hooks/usePagination";
import { useState } from "react";
import {
  Table,
  Button,
  Alert,
  Spinner,
  Container,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import "./ManageProducts.css";

export default function ManageUsers() {
  const { users, loading, error, deleteUser } = useUserCrud(
    import.meta.env.VITE_REACT_APP_ROUTE_USUARIOS
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const usersPerPage = 7;

  const {
    displayedItems: displayedUsers,
    currentPage,
    totalPages,
    handlePageChange,
    handleNextPage,
    handlePreviousPage,
  } = usePagination(users, usersPerPage);

  const navigate = useNavigate();

  const handleDeleteUser = (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que desea eliminar el producto?"
    );
    if (confirmDelete) {
      deleteUser(id);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        window.location.reload();
      }, 3000);
    }
  };

  const handleEditUser = (id) => {
    navigate(`/edit-user/${id}`);
  };

  if (loading)
    return (
      <container className="vh-100 vw-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </container>
    );
  if (error)
    return (
      <Alert variant="danger">
        Error: {error.message || "Error desconocido"}
      </Alert>
    );

  return (
    <div className="section-width">
      <Container className="section-manageUsers">
        <Row className="my-4">
          <Col>
            <h3>Administrar Usuarios</h3>
          </Col>
          <Col>
            <Button variant="success" onClick={() => navigate("/create-user")}>
              Crear Usuario
            </Button>
          </Col>
        </Row>
        {showSuccessMessage && (
          <Alert variant="success" className="toast success-toast">
            Usuario eliminado con éxito.
          </Alert>
        )}

        <Table variant="dark" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Íncice</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Nombre de Usuario</th>
              <th>Gmail</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
                <td>{user._id}</td>
                <td>{user.nombre}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.esAdmin}</td>
                <td style={{ width: "80px", whiteSpace: "nowrap" }}>
                  
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditUser(user._id)}
                  >
                    <i className="fi fi-sr-user-pen"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <i className="fi fi-ss-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Paginación */}
        <Row>
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              />

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Pagination.Item>
                )
              )}
              <Pagination.Next
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
