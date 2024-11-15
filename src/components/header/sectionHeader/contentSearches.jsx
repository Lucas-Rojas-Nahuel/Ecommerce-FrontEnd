import PropTypes from "prop-types";
import './contentSearches.css'

export default function ContentSearches({isActive,onFocus, onBlur}) {
  return (
    <div className={`content-searches ${isActive ? "input-active" : ""}`}>
      <input
        className="search" 
        id="search"
        type="text"
        placeholder="Buscar productos"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <label htmlFor="search" className="content-icon">
        <i className="fi fi-rs-search"></i>
      </label>
    </div>
  );
}

ContentSearches.propTypes = {
    
    isActive: PropTypes.bool.isRequired,
    
    onFocus: PropTypes.func.isRequired,
    onBlur:PropTypes.func.isRequired,
};