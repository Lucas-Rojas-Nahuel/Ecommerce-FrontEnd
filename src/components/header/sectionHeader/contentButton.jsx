import PropTypes from "prop-types";
import "./contentButton.css";
import useUserRole from "../../../hooks/users/useUserRole";
import useUserProfile from "../../../hooks/users/useUserProfile";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setButtonActive} from "../../../features/button/buttonModal";


export function ContentButton({
  onClick,
  isVisible,
  setIsAuthenticated,
}) {
  const dispatch = useDispatch();
  

  const { role } = useUserRole();
  const { profile } = useUserProfile(setIsAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate('/home')
    window.location.reload();
  };

  return (
    <div className="content-button">
      <button onClick={onClick} className="content-icon-search">
        {isVisible ? (
          <i className="fi fi-br-cross"></i>
        ) : (
          <i className="fi fi-br-search"></i>
        )}
      </button>
      <div className="dropdown-menu">
        {profile ? (
          <button onClick={toggleDropdown} className="btn-users dropdown-button">
            <i className="fi fi-sr-user"></i>
            {role ? <p>{profile.nombre}</p> : <p>Ingresar</p>}
          </button>
        ) : (
          <button
            className="btn-users"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setButtonActive())
            }} 
          >
            <i className="fi fi-sr-user"></i>
            {profile ? (
              <>{role ? <p>{profile.name}</p> : <p>Ingresar</p>}</>
            ) : (
              <p>Ingresar</p>
            )}
          </button>
        )}

        {isOpen && (
          <div className="drop-down-content">
            <NavLink to="/profile" className='dropdownItem dropdownItem-navLink'>Mi Cuenta</NavLink>
            <button onClick={handleLogout} className='dropdownItem'>Cerrar sesión</button>
          </div>
        )}
      </div>

      {role === "user" ? (
        <a href="" className="shopping">
          <i className="fi fi-ss-shopping-cart"></i>
        </a>
      ) : (
        ""
      )}
    </div>
  );
}
ContentButton.propTypes = {
  onClick: PropTypes.func.isRequired, // Especifica que onClick1 es una función y es requerida
  isVisible: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};
