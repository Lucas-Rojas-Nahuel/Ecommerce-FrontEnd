import PropTypes from "prop-types";
import "./login.css";

export default function Login({ toggleModal, toggleView }) {
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
      <form action="" className="form-login">
        <div className="content-label-input">
          <label htmlFor="email-login">Email</label>
          <input type="email" id="email-login" />
        </div>
        <div className="content-label-input">
          <label htmlFor="password-login">Contraseña</label>
          <input type="password" id="password-login" />
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
};
