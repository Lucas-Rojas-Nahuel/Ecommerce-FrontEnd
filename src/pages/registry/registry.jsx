import PropTypes from "prop-types";
import Register from "./register";
import Login from "./login";
import './registry.css'

export default function Registry({toggleModal, toggleView, isRegisterView, setIsAuthenticated, role}) {
  
  return (
    <div className="modal-overlay" onClick={(e) =>{
        e.stopPropagation();
        toggleModal;
    }}>
      <div className="model-content">
        {isRegisterView ? (
            <Login toggleModal={toggleModal} toggleView={toggleView} setIsAuthenticated={setIsAuthenticated} role={role}/>
        ) : (
            <Register toggleModal={toggleModal} toggleView={toggleView} setIsAuthenticated={setIsAuthenticated} />
        )}
      </div>
    </div>
  );
}

Registry.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    toggleView: PropTypes.func.isRequired,
    isRegisterView: PropTypes.bool.isRequired,
    setIsAuthenticated: PropTypes.func.isRequired,
    role: PropTypes.oneOfType([ PropTypes.string, PropTypes.oneOf([null]) ]),
}