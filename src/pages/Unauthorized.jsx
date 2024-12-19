import { Container, Row, Col, Button } from "react-bootstrap";
import useUserRole from "../hooks/users/useUserRole";

export default function Unauthorized() {
  const { role } = useUserRole();
  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column justify-content-center align-items-center text-center bg-light"
    >
      <Row>
        <Col>
          <h1 className="display-4 text-danger mb-3">Acceso No Autorizado</h1>
          <p className="lead text-muted">
            Lo sentimos, no tienes los permisos necesarios para acceder a esta
            página.
          </p>
          <p>
            Si crees que esto es un error, por favor contacta al administrador
            del sistema.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button variant="primary" href={role == 'admin'?'/adminView':'/'}>
              Volver al Inicio
            </Button>
           
          </div>
        </Col>
      </Row>
    </Container>
  )
}
