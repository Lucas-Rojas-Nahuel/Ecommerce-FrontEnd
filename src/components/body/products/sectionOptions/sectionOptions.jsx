import "./sectionOptions.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilter,
  removeFilter,
  filterByCategory,
  sortProducts,
  clearFilters,
} from "../../../../slices/productsSlice";
import Form from "react-bootstrap/Form";

export default function SectionOptions() {
  const allProducts = useSelector((state) => state.products.allProducts);
  const mar = useSelector((state) => state.products.marca);
  const cate = useSelector((state) => state.products.categoria);
  const dispatch = useDispatch();

  const activeCategorias = cate;
  const activeMarcas = mar;

  // Maneja el cambio en los checkboxes de categoría y marca
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      dispatch(addFilter({ name, value }));
    } else {
      dispatch(removeFilter({ name, value }));
    }
  };

  // Aplica los filtros seleccionados
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterByCategory({ mar: activeMarcas, cate: activeCategorias }));
  };

  // Quita todos los filtros
  const handleClearFilters = () => {
    dispatch(clearFilters()); // Limpia filtros
  };

  // Ordena los productos
  const handleSort = (e) => {
    dispatch(sortProducts(e.target.value));
  };

  // Obtén categorías y marcas únicas
  const categories = Array.from(new Set(allProducts.map((p) => p.categoria)));
  const filteredBrands = Array.from(
    new Set(
      allProducts
        .filter((product) =>
          activeCategorias.length
            ? activeCategorias.includes(product.categoria)
            : true
        )
        .map((product) => product.marca)
    )
  );

  return (
    <section className="section-options container  p-3 shadow">
      <div className="div-options ">
        <h4 className="text-primary mb-3">Ordenamiento</h4>
        <select className="form-select mb-4" onChange={handleSort}>
          <option value="asc">Menor a Mayor</option>
          <option value="desc">Mayor a Menor</option>
        </select>

        <h3 className="text-secondary mb-3">Filtros</h3>
        <form onSubmit={handleSubmit}>
          <ul className="list-group mb-3">
            <li className="list-group-item bg-primary text-white">
              Categorías
            </li>
            {categories.map((categoria, index) => (
              <li
                key={index}
                className="list-group-item bg-secondary d-flex align-items-center "
              >
                <Form.Check
                  type="switch"
                  id={`checkbox-${index}`}
                  className="me-2 custom-checkbox"
                  name="categoria"
                  value={categoria}
                  onChange={handleChange}
                  checked={activeCategorias.includes(categoria)}
                />
                {categoria}
              </li>
            ))}
          </ul>

          {activeCategorias.length > 0 && (
            <ul className="list-group mb-3">
              <li className="list-group-item bg-success text-white">Marcas</li>
              {filteredBrands.map((marca, index) => (
                <li
                  key={index}
                  className="list-group-item bg-secondary d-flex align-items-center"
                >
                  <Form.Check
                    type="switch"
                    id={`checkbox-${index}`}
                    className="me-2 custom-checkbox"
                    name="marca"
                    value={marca}
                    onChange={handleChange}
                    checked={activeMarcas.includes(marca)}
                  />
                  {marca}
                </li>
              ))}
            </ul>
          )}
          <div className="d-flex gap-2 align-items-center justify-content-center mb-5 ">
            <button className="button-filter btn btn-primary" type="submit">
              Filtrar
            </button>
            <button
              className="button-filter btn btn-outline-secondary"
              type="button"
              onClick={handleClearFilters}
            >
              Quitar Filtros
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

SectionOptions.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
