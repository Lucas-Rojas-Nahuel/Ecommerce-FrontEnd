import PropTypes from "prop-types";
import Register from "./register";
import Login from "./login";
import './registry.css'

export default function Registry({toggleModal, toggleView, isRegisterView}) {
  return (
    <div className="modal-overlay" onClick={(e) =>{
        e.stopPropagation();
        toggleModal;
    }}>
      <div className="model-content">
        {isRegisterView ? (
            <Login toggleModal={toggleModal} toggleView={toggleView} />
        ) : (
            <Register toggleModal={toggleModal} toggleView={toggleView} />
        )}
      </div>
    </div>
  );
}

Registry.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    toggleView: PropTypes.func.isRequired,
    isRegisterView: PropTypes.bool.isRequired
}