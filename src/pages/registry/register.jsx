import { NavLink } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setButtonInactive,
  setRegistryActive,
} from "../../features/button/buttonModal";

export default function Register() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    nombre: "",
    username: "",
    email: "",
    password: "",
    isAdmin: "user",
  });

  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");

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
        "http://localhost:3000/api/v1/usuarios",
        form
      );
      console.log(response);
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      dispatch(setRegistryActive());
    } catch (error) {
      console.error("Error en el registro", error);
      setError("Error en el registro");
    }
  };

  return (
    <>
      <div className="content-btn-close">
        <button
          className="btn-close"
          type="button"
          onClick={() => dispatch(setButtonInactive())}
        >
          <i className="fi fi-br-cross"></i>
        </button>
      </div>
      <div className="content-text">
        <h2>Registrarse</h2>
        <p>Ingresá tus datos para crear tu cuenta</p>
        {error && <p className="error">{error}</p>}
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
              name="nombre"
              value={form.nombre}
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
        <NavLink onClick={() => dispatch(setRegistryActive())}>aca</NavLink>
      </p>
    </>
  );
}
