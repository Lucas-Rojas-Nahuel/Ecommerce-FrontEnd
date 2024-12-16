import { useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { deleteOrder } from "../../slices/orderSlice";
import { useEffect } from "react";

 

export default function FailurePage() {
  const dispatch =useDispatch()
    const [searchParams] = useSearchParams();
    
    // Extraer parámetros de la URL (opcional)
    const collectionId = searchParams.get("collection_id");
  
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const ordenId = queryParams.get('ordenId')
    
    useEffect(()=>{
      if(ordenId){
        dispatch(deleteOrder(ordenId))
      }
    },[ordenId,dispatch])

    

    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Hubo un problema con tu pago</h1>
        <p>Tu orden ha sido cancelada. Por favor, intenta nuevamente.</p>
        <p><strong>ID de Transacción:</strong> {collectionId || "No disponible"}</p>
        <a href="/product-orders" style={{ textDecoration: "none", color: "blue" }}>Reintentar pago</a>
        <br />
        <a href="/" style={{ textDecoration: "none", color: "blue" }}>Volver al inicio</a>
      </div>
    );
}
