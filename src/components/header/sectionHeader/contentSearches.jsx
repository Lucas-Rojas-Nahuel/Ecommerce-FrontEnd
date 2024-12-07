import PropTypes from "prop-types";
import './contentSearches.css'
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../../slices/searchSlice";

export default function ContentSearches({isActive,onFocus, onBlur}) {
  const dispatch = useDispatch();
  const searchText = useSelector((state)=> state.search.text);

  

  const handleChange = (e) => {
    dispatch(setSearchText(e.target.value));
  };

  return (
    <div className={`content-searches ${isActive ? "input-active" : ""}`}>
      <input
        className="search" 
        id="search"
        type="text"
        placeholder="Buscar productos"
        value={searchText}
        onChange={handleChange}
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