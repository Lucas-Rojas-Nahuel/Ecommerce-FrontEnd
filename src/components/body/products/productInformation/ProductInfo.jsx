import { useNavigate, useParams } from "react-router-dom";
import "./ProductInfo.css";
import useProductCrud from "../../../../hooks/products/useProductCrud";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { addCart } from "../../../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { setButtonActive } from "../../../../features/button/buttonModal";

export default function ProductInfo() {
  const { id } = useParams(); //obtenemos el id desde la URL
  const { products, loading, error } = useProductCrud(
    import.meta.env.VITE_REACT_APP_ROUTE_PRODUCTS
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  //busca el producto en la lista de productos
  const product = products.find((item) => item._id === id);

  // Estados para las imágenes y la calificación
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice de la imagen actual
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  // Cambia a la siguiente imagen
  const nextImage = () => {
    if (currentImageIndex < product.imagen.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Cambia a la imagen anterior
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Maneja el cambio de calificación
  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  // Maneja el cambio de comentario
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Agrega una nueva reseña
  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = { rating, comment };
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setRating(1);
    setComment("");
    setMessage("¡Gracias por tu reseña!");
  };

  // Componente para mostrar las estrellas
  function StarRating({ rating }) {
    const stars = Array.from({ length: 5 }, (_, index) => {
      return index < rating ? "★" : "☆";
    });

    return <span>{stars.join(" ")}</span>;
  }
  StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
  };

  let imagen;
  let nombre;
  let precio;

  if (product) {
    imagen = product.imagen[0];
    nombre = product.nombre;
    precio = product.precio;
  }

  const handleAddCart = () => {
    dispatch(addCart({ id, imagen, nombre, precio }));
  };

  const [showAlert, setShowAlert] = useState(false);

  const handleAccess = () => {
    if (isAuthenticated) {
      navigate(`/product-orders/${id}`);
    } else {
      setShowAlert(true); // Muestra la alerta
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <section className="section-container">
      <Container className="section-product-info my-0">
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
        <Row className="product-info align-items-center m-0">
          <Col md={6}>
            <Card className="content-img-product">
              <Card.Img
                variant="top"
                src={product.imagen[currentImageIndex]}
                alt={product.nombre}
                className="product-info-img-main "
              />
              <Card.Body className="product-info-img-navigation d-flex justify-content-between">
                <Button
                  variant="secondary"
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                >
                  Anterior
                </Button>
                <Button
                  variant="secondary"
                  onClick={nextImage}
                  disabled={currentImageIndex === product.imagen.length - 1}
                >
                  Siguiente
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Información del producto */}
          <Col md={6} className="content-info-product">
            <h2 className="title-product-info ">{product.nombre}</h2>
            <hr />
            <p className="price-product">
              <strong>Precio: $</strong>
              {product.precio}
            </p>
            <hr />
            <p className="descrip-product">
              <strong>Descripción:</strong> {product.descripcion}
            </p>
            <hr />
            <span>
              <strong>Stock:</strong> {product.stock} unidades disponibles
            </span>
            <hr />

            <Button variant="primary" onClick={handleAddCart}>
              Añadir a carrito
            </Button>
            <Button variant="outline-success mx-1" onClick={handleAccess}>
              Comprar Producto
            </Button>
          </Col>
        </Row>
        <hr />
        <Row className="product-reviews-section m-0">
          <Col>
            <h3>Reseñas</h3>

            {/* Formulario de reseñas */}
            <Form
              onSubmit={handleSubmitReview}
              className="product-reviews-form"
            >
              <Form.Group className="product-reviews-form-item">
                <Form.Label>Calificación:</Form.Label>
                <Form.Select
                  value={rating}
                  onChange={handleRatingChange}
                  className="form-select border-secondary"
                  style={{
                    color: "black",
                    backgroundColor: "white",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} estrella{star > 1 && "s"}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="product-reviews-form-item mb-3">
                <Form.Label>Comentario:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Escribe tu reseña aquí"
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Enviar Reseña
              </Button>
            </Form>

            {/* Mensaje de agradecimiento */}
            {message && (
              <Alert variant="success" className="mt-3">
                {message}
              </Alert>
            )}
            <hr />
            {/* Mostrar reseñas */}
            {reviews.length > 0 ? (
              <ul className="product-reviews-list list-group">
                {reviews.map((review, index) => (
                  <li
                    key={index}
                    className="product-reviews-item list-group-item"
                  >
                    <p className="mb-1">
                      Calificación: <StarRating rating={review.rating} />
                    </p>
                    <p className="mb-0">Comentario: {review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">Aún no hay reseñas.</p>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
