import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../slices/orderSlice";

export const usePreventNavigation = (shouldBlock, message, ordenId) => {
  const dispatch = useDispatch();

  useEffect(() => {
     // Revisar si hay una orden pendiente de eliminación al iniciar la aplicación
     const pendingOrderId = sessionStorage.getItem("pendingOrderId");

    if(pendingOrderId){
      console.log("Eliminando orden pendiente al recargar...");
      dispatch(deleteOrder(pendingOrderId));
      sessionStorage.removeItem("pendingOrderId");
    }


    const handleBeforeUnload = (event) => {
      if (shouldBlock) {
        event.preventDefault();
        event.returnValue = message;

        if (ordenId){
          // Guardar en sessionStorage la orden pendiente para eliminar
          sessionStorage.setItem("pendingOrderId", ordenId);
          console.log("Orden marcada para eliminar en la próxima recarga.");
        }
        return message;
      }
    };

    

    const handlePopState = () => {
      if (shouldBlock) {
        if (!window.confirm(message)) {
          window.history.pushState(null, "", window.location.href);
        } else if (ordenId) {
          console.log("Eliminando orden...");
          dispatch(deleteOrder(ordenId));
        }
      }
    };

    //escucha los eventos de navegación
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    window.addEventListener("popstate", handlePopState);

    //agrega un estado ficticio al historial para manejar el evento 'popstate'
    window.history.pushState(null, "", window.location.href);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
     
      window.removeEventListener("popstate", handlePopState);
    };
  }, [shouldBlock, message, dispatch, ordenId]);
};
