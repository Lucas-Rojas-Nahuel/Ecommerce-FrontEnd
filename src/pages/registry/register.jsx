
import PropTypes from "prop-types";
import "./login.css";
export default function Register({toggleModal, toggleView}) {
  return (
    <>
      <button type="button" onClick={toggleModal}>Cerrar</button>
      <div>register</div>
        <button type="button" onClick={toggleView}>Login</button>
    </>
  );
}

Register.propTypes= {
  toggleModal: PropTypes.func.isRequired,
  toggleView: PropTypes.func.isRequired
}