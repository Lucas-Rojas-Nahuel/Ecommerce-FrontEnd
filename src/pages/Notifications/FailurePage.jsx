import { useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { deleteOrder } from "../../slices/orderSlice";
import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function FailurePage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // Extraer parámetros de la URL (opcional)
  const collectionId = searchParams.get("collection_id");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ordenId = queryParams.get("ordenId");

  useEffect(() => {
    if (ordenId) {
      dispatch(deleteOrder(ordenId));
    }
  }, [ordenId, dispatch]);

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
    >
      <Row className="justify-content-center">
        <Col>
          <h1 className="mb-4 text-danger">Hubo un problema con tu pago</h1>
          <p className="lead">
            Tu orden ha sido cancelada. Por favor, intenta nuevamente.
          </p>
          <p>
            <strong>ID de Transacción:</strong>{" "}
            {collectionId || "No disponible"}
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button variant="outline-primary" href="/product-orders">
              Reintentar pago
            </Button>
            <Button variant="primary" href="/" className="">
              Volver al inicio
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
