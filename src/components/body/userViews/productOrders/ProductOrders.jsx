/* eslint-disable no-unused-vars */
import "./ProductOrders.css";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { setOrdenActive, setPageInative } from "../../../../features/OrdenCreate/OrdenCreate";
import { usePreventNavigation } from "../../../../hooks/usePreventNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder, deleteOrder, fetchOrders } from "../../../../slices/orderSlice";
import useRouteState from "../../../../hooks/useRouteState";


initMercadoPago(import.meta.env.VITE_REACT_APP_KEY_MERCADO_PAGO);

export default function ProductOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const isOrdenCrate = useSelector((state) => state.isOrden.ordenCreate);

  const [ordenCreate, setOrdenCreate] = useState(false)
  const [ordenId, setOrdenId] = useState(null)

  const orders = useSelector((state)=>state.orders.orders)
  const status = useSelector((state)=>state.orders.status)

  
  useRouteState('/product-orders');
  
  useEffect(()=>{
    if(status === 'idle'){
      dispatch(fetchOrders())
    }
    if(ordenCreate && orders.length > 0){
      const lastOrder = orders[orders.length - 1]
      setOrdenId(lastOrder._id)
      setOrdenCreate(false)
    }
      
  }, [status, dispatch, orders, ordenCreate]);
  

  console.log(ordenId)

 
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
 usePreventNavigation(isOrdenCrate, 'Tienes un pedido pendiente. Si abandonas la página, el pedido será cancelado.', ordenId)
  

  const createPreference = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_ROUTE_MEACADO_PAGO,{cart, ordenId}
        
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error("Error creando preferencia: ", error);
    }
  };

  const handleBuy = async () => {
    setIsLoading(true);
    dispatch(setOrdenActive(true))
    const id = await createPreference();
    setIsLoading(false);
    id && setPreferenceId(id);
  };

 
   
  const cancelOrder = async () => {
    if(ordenId){
      alert("Pedido cancelado.");
      
      dispatch(deleteOrder(ordenId))
      navigate('/cart')
    }else{
      alert("Pedido cancelado.");
      navigate('/cart')
    }
  };

  const productoEnOrden = cart.map((producto) => ({
    producto: producto.id,
    cantidad: producto.quantity,
  }));

  const [formData, setFormData] = useState({
    usuario: `${profile._id}`,
    productosEnOrden: productoEnOrden,
    direccion: "",
    ciudad: "",
    localidad: "",
    codigoPostal: "",
    telefono: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
     dispatch(createOrder(formData)).unwrap().then(()=>{
      setOrdenCreate(true);
     }).catch((error)=> {
      console.error('Error creando la orden: ',error)
     })   
    dispatch(setOrdenActive(true));
    handleBuy();
  };

  

  return (
    <section className="section-orders">
      <div className="content-orders">
        <h4>Orden de Producto</h4>
        <form onSubmit={handleSubmit} className="form-orders">
          <div>
            <label>Dirección</label>
            <input
              type="text"
              required
              onChange={(e) =>
                setFormData({ ...formData, direccion: e.target.value })
              }
            />
          </div>
          <div>
            <label>Ciudad</label>
            <input
              type="text"
              required
              onChange={(e) =>
                setFormData({ ...formData, ciudad: e.target.value })
              }
            />
          </div>
          <div>
            <label>Localidad</label>
            <input
              type="text"
              required
              onChange={(e) =>
                setFormData({ ...formData, localidad: e.target.value })
              }
            />
          </div>
          <div>
            <label>Codigo Postal</label>
            <input
              type="number"
              required
              onChange={(e) =>
                setFormData({ ...formData, codigoPostal: e.target.value })
              }
            />
          </div>
          <div>
            <label>Numero de telefono</label>
            <input
              type="number"
              onChange={(e) =>
                setFormData({ ...formData, telefono: e.target.value })
              }
            />
          </div>
          <div>
            <button disabled={isLoading} type="submit">
              Realizar Pedido
            </button>
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    "¿Estás seguro de que quieres cancelar el pedido?"
                  )
                ) {
                  cancelOrder();
                }
              }}
            >
              Cancelar Pedido
            </button>
          </div>
          {isLoading && <p>Generando tu pedido, por favor espera...</p>}
          {preferenceId && (
            <Wallet
              initialization={{
                preferenceId: preferenceId,
                redirectMode: "blank",
              }}
            />
          )}
        </form>
      </div>
    </section>
  );
}
