import { useState } from "react";
import useProductCrud from "../../../../hooks/products/useProductCrud";
import "./sectionOptions.css";
import PropTypes from "prop-types";

export default function SectionOptions({onFilterChange}) {
  const { products, loading, error} = useProductCrud(
    "http://localhost:3001/api/v1/productos"
  );
  const [filters, setFilters] = useState({ categoria: [], marca: [] });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: [...prevFilters[name], value],
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: prevFilters[name].filter(
          (filterValue) => filterValue !== value
        ),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters)
  };

  const handleClearFilters = () => {
    const clearedFilters = {categoria: [], marca: []};
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  }

  return (
    <section className="section-options">
      {loading && <div>Cargando...</div>}{" "}
      {error && <div>Error: {error.message}</div>}
      <h3>Categorias</h3>
      {/* tengo que modificar el componente CategoryOption  */}
      <form onSubmit={handleSubmit}>
        <ul>
          <li>Marca</li>
          {[...new Set(products.map((marca) => marca.marca))].map(
            (marcaUnica, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  name="marca"
                  value={marcaUnica}
                  checked={filters.marca.includes(marcaUnica)}
                  onChange={handleChange}
                />
                {marcaUnica}
              </li>
            )
          )}
        </ul>
        <ul>
          <li>Categoria</li>
          {[...new Set(products.map((categoria) => categoria.categoria))].map(
            (categoriaUnica, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  name="categoria"
                  value={categoriaUnica}
                  checked={filters.categoria.includes(categoriaUnica)}
                  onChange={handleChange}
                />
                {categoriaUnica}
              </li>
            )
          )}
        </ul>
        <button type="submit">Filtrar</button>
        <button type="button" onClick={handleClearFilters}>Quitar Filtro</button>
      </form>
    </section>
  );
}

SectionOptions.propTypes = {
   onFilterChange: PropTypes.func.isRequired, 
  };