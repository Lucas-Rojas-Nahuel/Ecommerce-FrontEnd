import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { useState } from "react";

export default function Register({
  toggleModal,
  toggleView,
  setIsAuthenticated,
}) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  console.log(form);
  console.log(passwordRepeat);

  const handleRegister = async () => {
    setError("");

    if (form.password !== passwordRepeat) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        form
      );

      const token = await response.data.token;
      console.log(token);
      if (token) {
        localStorage.setItem("token", token);
        console.log(setIsAuthenticated);
        setIsAuthenticated(true);
        setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
        navigate('/userView')
      } else {
        console.error(`token no encontrado en la respuesta`);
        setError(
          "Hubo un problema al registrar el usuario. Intenta nuevamente."
        );
      }
    } catch (error) {
      console.error("Error en el registro", error);
      setError("Error en el registro");
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
        <h2>Registrarse</h2>
        <p>Ingresá tus datos para crear tu cuenta</p>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="form-register"
      >
        <div className="content-data">
          <div className="content-label-input">
            <label htmlFor="name-register">Nombre</label>
            <input
              type="text"
              id="name-register"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="content-label-input">
            <label htmlFor="lastname-register">Nombre de Usuario</label>
            <input
              type="text"
              id="lastname-register"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="content-label-input">
          <label htmlFor="email-register">Email</label>
          <input
            type="email"
            id="email-register"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="content-data">
          <div className="content-label-input">
            <label htmlFor="password-register">Contraseña</label>
            <input
              type="password"
              id="password-register"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="content-label-input">
            <label htmlFor="password-repeat-register">Repetir Contraseña</label>
            <input
              type="password"
              id="password-repeat-register"
              name="passwordRepeat"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          REGISTRARME
        </button>
      </form>

      <p>
        ¿Ya tenés cuenta? Inicia sesión{" "}
        <NavLink onClick={toggleView}>aca</NavLink>
      </p>
    </>
  );
}

Register.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  toggleView: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};
