import { useSearchParams } from "react-router-dom";

 

export default function FailurePage() {
    const [searchParams] = useSearchParams();

    // Extraer parámetros de la URL (opcional)
    const collectionId = searchParams.get("collection_id");
  
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Hubo un problema con tu pago</h1>
        <p>No pudimos procesar tu pago. Por favor, intenta nuevamente.</p>
        <p><strong>ID de Transacción:</strong> {collectionId || "No disponible"}</p>
        <a href="/checkout" style={{ textDecoration: "none", color: "blue" }}>Reintentar pago</a>
        <br />
        <a href="/" style={{ textDecoration: "none", color: "blue" }}>Volver al inicio</a>
      </div>
    );
}
