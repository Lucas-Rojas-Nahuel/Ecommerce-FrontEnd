import PropTypes from "prop-types";
import "./login.css";
import { NavLink } from "react-router-dom";
import "./register.css";

export default function Register({ toggleModal, toggleView }) {
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
      </div>
      <form action="" className="form-register">
        <div className="content-data">
          <div className="content-label-input">
            <label htmlFor="name-register">Nombre</label>
            <input type="text" id="name-register" required />
          </div>
          <div className="content-label-input">
            <label htmlFor="lastname-register">Apellido</label>
            <input type="text" id="lastname-register" required />
          </div>
        </div>

        {/* contenidos reponsivos */}
        <div className="content-label-input-responsi">
          <label htmlFor="name-register-responsi">Nombre</label>
          <input type="text" id="name-register-responsi" required />
        </div>
        <div className="content-label-input-responsi">
          <label htmlFor="lastname-register-responsi">Apellido</label>
          <input type="text" id="lastname-register-responsi" required />
        </div>

        <div className="content-label-input">
          <label htmlFor="email-register">Email</label>
          <input type="email" id="email-register" required />
        </div>
        <p>Teléfono de contacto</p>
        <div className="data-phone">
          <div className="content-label-input code-area-register">
            <label htmlFor="code-area">Código de área</label>
            <input type="number" id="code-area" required />
          </div>
          <div className="content-label-input phone-number-register">
            <label htmlFor="phone-number">Número de teléfono</label>
            <input type="number" id="phone-number" required />
          </div>
        </div>
        <div className="content-data">
          <div className="content-label-input">
            <label htmlFor="password-register">Contraseña</label>
            <input type="password" id="password-register" required />
          </div>
          <div className="content-label-input">
            <label htmlFor="password-repeat-register">Repetir Contraseña</label>
            <input type="password" id="password-repeat-register" required />
          </div>
        </div>

        {/* contenidos responsivos */}
        <div className="content-label-input-responsi">
          <label htmlFor="password-register-responsi">Contraseña</label>
          <input type="password" id="password-register-responsi" required />
        </div>
        <div className="content-label-input-responsi">
          <label htmlFor="password-repeat-register-responsi">Repetir Contraseña</label>
          <input type="password" id="password-repeat-register-responsi" required />
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
};
