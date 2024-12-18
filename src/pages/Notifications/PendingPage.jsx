import { Container, Row, Col, Button } from "react-bootstrap";

export default function PendingPage() {
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light"
    >
      <Row className="justify-content-center">
        <Col>
          <h1 className="mb-4 text-info">Tu pago está en proceso</h1>
          <p className="lead">
            Estamos verificando tu pago. Recibirás una notificación una vez que
            se confirme.
          </p>
          <Button variant="primary" href="/" className="">
            Volver al inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
