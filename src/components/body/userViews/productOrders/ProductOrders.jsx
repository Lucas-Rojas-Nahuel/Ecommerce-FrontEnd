/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import "./ProductOrders.css";
import {  useState } from "react";
 
import { setOrdenActive } from "../../../../features/OrdenCreate/OrdenCreate";
import { createOrder } from "../../../../slices/orderSlice";


export default function ProductOrders() {
  const dispatch = useDispatch();
  const { profile } = useSelector(
    (state) => state.auth
  );
  const cart = useSelector((state) => state.cart);
  const isOrdenCrate = useSelector((state) => state.isOrden.ordenCreate)
  

  console.log(isOrdenCrate)
  console.log(profile._id)

  const productoEnOrden = cart.map((producto) => ({
    producto: producto.id,
    cantidad: producto.quantity,
  }));

  /* useEffect(() => {
    if (!isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]); */

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
     /* dispatch(createOrder(formData)); */ 
    dispatch(setOrdenActive())
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
            <button type="submit">Realizar Pedido</button>
            <button>Cancelar Pedido</button>
          </div>
        </form>
      </div>
    </section>
  );
}
