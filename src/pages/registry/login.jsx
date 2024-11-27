import PropTypes from "prop-types";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login({ toggleModal, toggleView, setIsAuthenticated }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        form
      );
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      console.log(response);
      const role = response.data.user._doc.role;
      console.log(response.data.user._doc.role)
      if(role == 'admin'){
        navigate('/adminView')
      }else if(role == 'user'){
        navigate('/userView')
      } else{
        navigate('/home')
      }

    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("usuario no encontrado. Por favor, resgistrate.");
      } else {
        alert("el usuario no existe, debe registrarse");
      }
    }
    window.location.reload()
    
  }; 

  

  return (
    <>
      <div className="content-btn-close">
        <button className="btn-close" type="button" onClick={toggleModal}>
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
      <button type="button" onClick={toggleView} className="btn">
        CREAR CUENTA
      </button>
    </>
  );
}

Login.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  toggleView: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  
};
