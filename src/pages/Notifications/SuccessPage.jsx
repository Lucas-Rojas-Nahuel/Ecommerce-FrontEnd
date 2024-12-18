import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  // Extraer parámetro de la URL
  const collectionId = searchParams.get("collection_id");
  const status = searchParams.get("status");
  const preferenceId = searchParams.get("preference_id");

  return (
    <Container fluid
    className="d-flex flex-column justify-content-center align-items-center vh-100 vw-100 text-center">
      <Row className="justify-content-center">
        <Col >
          <h1 className="mb-4">¡Gracias por tu compra!</h1>
          <p className="lead">Tu pago fue exitoso. Estamos procesando tu pedido.</p>
          <p>
            <strong>ID de Transacción:</strong> {collectionId}
          </p>
          <p>
            <strong>Estado del Pago:</strong> {status}
          </p>
          <p>
            <strong>Preferencia:</strong> {preferenceId}
          </p>
          <Button variant="primary" href="/" className="mt-4">
            Volver al inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
