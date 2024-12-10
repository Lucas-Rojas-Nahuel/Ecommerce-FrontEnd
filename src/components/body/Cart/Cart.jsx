import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../../slices/cartSlice";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { setButtonActive } from "../../../features/button/buttonModal";


initMercadoPago("APP_USR-df34c673-b2bb-4e26-8ec7-05cca3654e42");

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const {isAuthenticated } = useSelector(
    (state) => state.auth
  );

   

  

  const navigate = useNavigate();

  const [preferenceId, setPreferenceId] = useState(null);

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/create_preference",
        cart
      );
      console.log(response.data);

      const { id } = response.data;
      return id;
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const total = cart.reduce(
    (total, item) => total + item.precio * item.quantity,
    0
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleBuy = async () => {
    const id = await createPreference();
    id && setPreferenceId(id);
  };

  const handleAccess = () => {
    if (isAuthenticated) {
      alert("acceso permitido");
      navigate(`/product-orders`);
      
    } else {
      alert("Usuario no registrado, por favor inicie seción.");
      dispatch(setButtonActive());
    }
  };

  return (
    <div className="cart">
      {!cart.length ? (
        <>
          <h3>Carrito Vacio</h3>
          <NavLink to="/products">
            <button className="btn-cart">Seguir Comprando</button>
          </NavLink>
        </>
      ) : (
        <div>
          <h3>Carrito de Compras</h3>
          <table className="cartable">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>$ {item.precio.toLocaleString("es-ES")}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    $ {(item.quantity * item.precio).toLocaleString("es-ES")}
                  </td>
                  <td>
                    <button onClick={() => handleRemove(item.id)}>
                      <i className="fi fi-ss-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Resumen de compra</h4>
          <p>Total: $ {total.toLocaleString("es-ES")}</p>
          <NavLink to="/products">
            <button className="btn-cart">Seguir Comprando</button>
          </NavLink>
          <button onClick={handleClearCart} className="btn-cart">
            Vaciar el carrito
          </button>
          <div>
            <button onClick={handleAccess} className="btn-cart green">
              Realizar pedido
            </button>
            <button onClick={handleBuy} className="btn-cart green">
              Pagar
            </button>
            {preferenceId && (
              <Wallet
                initialization={{
                  preferenceId: preferenceId,
                  redirectMode: "blank",
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
