import { useSearchParams } from "react-router-dom";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  // Extraer parámetro de la URL
  const collectionId = searchParams.get("collection_id");
  const status = searchParams.get("status");
  const preferenceId = searchParams.get("preference_id");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>¡Gracias por tu compra!</h1>
      <p>Tu pago fue exitoso. Estamos procesando tu pedido.</p>
      <p>
        <strong>ID de Transacción:</strong> {collectionId}
      </p>
      <p>
        <strong>Estado del Pago:</strong> {status}
      </p>
      <p>
        <strong>Preferencia:</strong> {preferenceId}
      </p>
      <a href="/" style={{ textDecoration: "none", color: "blue" }}>
        Volver al inicio
      </a>
    </div>
  );
}
