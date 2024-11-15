import PropTypes from "prop-types";
import './contentResponsi.css'

export default function ContentResponsi({isActive, handlerFocus, handlerBlur}) {
  return (
    <div className="content-responsi">
      <div
        className={`content-searches-responsi ${
          isActive ? "input-active" : ""
        }`}
      > 
        <input
          className="search-responsi"
          id="search-responsi"
          type="text"
          placeholder="Buscar productos"
          onFocus={handlerFocus}
          onBlur={handlerBlur}
        />
        <label htmlFor="search-responsi" className="content-icon-responsi">
          <i className="fi fi-rs-search"></i>
        </label>
      </div>
    </div>
  );
}

ContentResponsi.propTypes = {
    isActive: PropTypes.bool.isRequired,
    handlerFocus: PropTypes.func.isRequired,
    handlerBlur: PropTypes.func.isRequired,
}
