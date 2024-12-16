
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setButtonInactive, setRegistryInactive } from "../../features/button/buttonModal";
 



export default function Login() {
  const dispatch = useDispatch();
  
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_REACT_APP_ROUTE_LOGIN,
        form
      );
      console.log(response)
      localStorage.setItem("token", response.data.token);
      
      const role = response.data.usuario.esAdmin
      
      if(role == 'admin'){
        navigate('/adminView')
      }else if(role == 'user'){
        navigate('/userView')
      } else{
        navigate('/home')
      }
 
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("usuario no encontrado. Por favor, resgistrate.");
      } else {
        console.error("el usuario no existe, debe registrarse");
      }
    }
    
      window.location.reload()    
  }; 

  return (
    <>
      <div className="content-btn-close">
        <button className="btn-close" type="button" onClick={()=> dispatch(setButtonInactive())}>
          <i className="fi fi-br-cross"></i>
        </button>
      </div>
      <div className="content-text">
        <h2>Iniciar sesión</h2>
        <p>Para comenzar ingresá tu email</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="form-login"
      >
        <div className="content-label-input">
          <label htmlFor="email-login">Email</label>
          <input
            type="email"
            id="email-login"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="content-label-input">
          <label htmlFor="password-login">Contraseña</label>
          <input
            type="password"
            id="password-login"
            placeholder="Contraseña"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          CONTINUAR
        </button>
      </form>
      <button type="button" onClick={() => dispatch(setRegistryInactive())} className="btn">
        CREAR CUENTA
      </button>
    </>
  );
}

Login.propTypes = {
  
  
  
};
