import PropTypes from "prop-types";
import "./contentSearches.css";
import { useDispatch, useSelector } from "react-redux";
import { filterByText, setTextFilter } from "../../../slices/productsSlice";

export default function ContentSearches({ isActive, onFocus, onBlur }) {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.products.text);
  const allProducts = useSelector((state) => state.products.allProducts);

  const filterBySearch = allProducts.filter((dato) =>
    dato.nombre.toLowerCase().includes(searchText.toLocaleLowerCase())
  );
   
  const handleChange = (e) => {
    dispatch(setTextFilter(e.target.value));
    dispatch(filterByText(filterBySearch));
  };

  return (
    <div className={`content-searches ${isActive ? "input-active" : ""}`}>
      <input
        className="search"
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
  onBlur: PropTypes.func.isRequired,
};
