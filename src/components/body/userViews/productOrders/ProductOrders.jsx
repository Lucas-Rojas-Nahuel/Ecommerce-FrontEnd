import "./ProductOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { setOrdenActive } from "../../../../features/OrdenCreate/OrdenCreate";
import { usePreventNavigation } from "../../../../hooks/usePreventNavigation";
import { useNavigate, useParams } from "react-router-dom";
import {
  createOrder,
  deleteOrder,
  fetchOrders,
} from "../../../../slices/orderSlice";
import useRouteState from "../../../../hooks/useRouteState";
import { Container } from "react-bootstrap";
import useProductCrud from "../../../../hooks/products/useProductCrud";

initMercadoPago(import.meta.env.VITE_REACT_APP_KEY_MERCADO_PAGO);

export default function ProductOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const isOrdenCrate = useSelector((state) => state.isOrden.ordenCreate);

  const [ordenCreate, setOrdenCreate] = useState(false);
  const [ordenId, setOrdenId] = useState(null);

  const orders = useSelector((state) => state.orders.orders);
  const status = useSelector((state) => state.orders.status);

  const { products } = useProductCrud(
    import.meta.env.VITE_REACT_APP_ROUTE_PRODUCTS
  );

 
  let productoEnOrden = [];
  const productsList = []

  useRouteState("/product-orders");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrders());
    }
    if (ordenCreate && orders.length > 0) {
      const lastOrder = orders[orders.length - 1];
      setOrdenId(lastOrder._id);
      setOrdenCreate(false);
    }
  }, [status, dispatch, orders, ordenCreate]);

  
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  usePreventNavigation(
    isOrdenCrate,
    "Tienes un pedido pendiente. Si abandonas la página, el pedido será cancelado.",
    ordenId
  );

  const createPreference = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_ROUTE_MEACADO_PAGO,
        { productsList, ordenId }
      );
      console.log(response)
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error("Error creando preferencia: ", error);
    }
  };
 

  const handleBuy = async () => {
    setIsLoading(true);
    dispatch(setOrdenActive(true));
    const id = await createPreference();
    setIsLoading(false);
    id && setPreferenceId(id);
  };

  const { id } = useParams();
  useRouteState(`/product-orders/${id}`);

  const cancelOrder = async () => {
    if (ordenId) {
      alert("Pedido cancelado.");
      dispatch(deleteOrder(ordenId));
      if (id) {
        navigate(`/products/${id}`);
      } else {
        navigate("/cart");
      }
    } else {
      alert("Pedido cancelado.");
      if (id) {
         navigate(`/products/${id}`); 
      } else {
        navigate("/cart");
      } 
    }
  };
  
 
  
  if (id && products.length > 0) {
    const product = products.find((item) => item._id === id);
    if (product) {
      product.quantity = 1;
      productsList.push(product)
      productoEnOrden = {
        producto: product._id,
        cantidad: product.quantity,
      };
    } else {
      console.error("Producto no encontrado con el id:", id);
    }
  } else {
    productsList.push(...cart)
    productoEnOrden = cart.map((producto) => ({
      producto: producto.id,
      cantidad: producto.quantity,
    }));
  }
  
  
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
    dispatch(createOrder(formData))
      .unwrap()
      .then(() => {
        setOrdenCreate(true);
      })
      .catch((error) => {
        console.error("Error creando la orden: ", error);
      });
    dispatch(setOrdenActive(true));
    handleBuy();
  };

  

  return (
    <section className="section-orders py-5 my-1">
      <Container className="cart mx-auto" style={{ maxWidth: "700px" }}>
        <div className="content-orders">
          <h4 className="mb-4">Orden de Producto</h4>
          <form onSubmit={handleSubmit} className="form-orders">
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) =>
                  setFormData({ ...formData, direccion: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ciudad</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) =>
                  setFormData({ ...formData, ciudad: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Localidad</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) =>
                  setFormData({ ...formData, localidad: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Codigo Postal</label>
              <input
                type="number"
                className="form-control"
                required
                onChange={(e) =>
                  setFormData({ ...formData, codigoPostal: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Numero de telefono</label>
              <input
                type="number"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
              />
            </div>
            <div className="d-flex gap-2">
              <button
                disabled={isLoading}
                type="submit"
                className="btn btn-primary"
              >
                Realizar Pedido
              </button>
              <button
                type="button"
                className="btn btn-danger"
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
            {isLoading && (
              <p className="mt-3 text-info">
                Generando tu pedido, por favor espera...
              </p>
            )}
            {preferenceId && (
              <div
                className="mt-3"
                style={{ maxWidth: "350px", margin: "0 auto" }}
              >
                <Wallet
                  initialization={{
                    preferenceId: preferenceId,
                    redirectMode: "blank",
                  }}
                />
              </div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
