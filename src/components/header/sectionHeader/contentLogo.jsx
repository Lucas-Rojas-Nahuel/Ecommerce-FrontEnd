import PropTypes from "prop-types";
import './contentLogo.css'
import { NavLink } from "react-router-dom";


export function ContentLogo({onClick}) {
  
  return (
    <div className="content-logo">
      <button onClick={onClick} className="content-icon-nav">
        <i className="fi fi-br-menu-burger"></i>
      </button>
      <NavLink to="/home" >
        <h2 className="logo-text">LOGO</h2>
      </NavLink>
    </div>
  );
}

ContentLogo.propTypes = {
    onClick: PropTypes.func.isRequired
}
