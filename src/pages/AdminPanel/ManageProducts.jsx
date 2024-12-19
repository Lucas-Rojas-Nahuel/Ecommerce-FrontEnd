import { useNavigate } from "react-router-dom";
import useProductCrud from "../../hooks/products/useProductCrud";
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

export default function ManageProducts() {
  const { products, loading, error, deleteProduct } = useProductCrud(
    import.meta.env.VITE_REACT_APP_ROUTE_PRODUCTS
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const productsPerPage = 7;

  const {
    displayedItems: displayedProducts,
    currentPage,
    totalPages,
    handlePageChange,
    handleNextPage,
    handlePreviousPage,
  } = usePagination(products, productsPerPage);

  const navigate = useNavigate();

  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que desea eliminar el producto?"
    );
    if (confirmDelete) {
      deleteProduct(id);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        window.location.reload();
      }, 3000);
    }
  };

  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  if (loading) return <container className='vh-100 vw-100 d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></container> 
  if (error)
    return (
      <Alert variant="danger">
        Error: {error.message || "Error desconocido"}
      </Alert>
    );

  return (
    <div className="section-width">
      <Container className="section-manageProduct ">
        <Row className="my-4">
          <Col>
            <h3>Administrar Productos</h3>
          </Col>
          <Col className="text-end">
            <Button
              variant="success"
              onClick={() => navigate("/create-product")}
            >
              Crear Producto
            </Button>
          </Col>
        </Row>
        {/* Mensaje flotante */}
        {showSuccessMessage && (
          <Alert variant="success" className="toast success-toast">
            Producto eliminado con éxito.
          </Alert>
        )}

        <Table variant="dark" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Índice</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Fecha de Ingreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{(currentPage - 1) * productsPerPage + index + 1}</td>
                <td>{product._id}</td>
                <td>{product.nombre}</td>
                <td>{product.categoria}</td>
                <td>{product.marca}</td>
                <td>
                  ${new Intl.NumberFormat("es-AR").format(product.precio)}
                </td>
                <td>{product.stock}</td>
                <td>{new Date(product.fechaIngreso).toLocaleDateString()}</td>
                <td style={{ width: "80px", whiteSpace: "nowrap" }}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditProduct(product._id)}
                  >
                    <i className="fi fi-sr-edit-alt"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteProduct(product._id)}
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
