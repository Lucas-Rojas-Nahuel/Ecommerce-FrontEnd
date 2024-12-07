/* eslint-disable no-unused-vars */

import "./sectionOptions.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilter,
  filterByCategory,
  loadMarcas,
  removeFilter,
  sortProducts,
  updateProductsCopy,
} from "../../../../slices/productsSlice";
import React from "react";

export default function SectionOptions() {
  const allProducts = useSelector((state) => state.products.allProducts);
  const mar = useSelector((state) => state.products.marca);
  const cate = useSelector((state) => state.products.categoria);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      dispatch(addFilter({ name, value }));
    } else {
      dispatch(removeFilter({ name, value }));
    }
  };

  const handleRemove = () => {
    
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!mar.length){
      dispatch(loadMarcas(marca))
    }
     
    dispatch(filterByCategory({ mar, cate }));
    
  };

  const categories = Array.from(
    new Set(allProducts.map((product) => product.categoria))
  );

  const productsFilteredByCategory = allProducts.filter((producto) =>
    cate.includes(producto.categoria)
  );

  const brandFilteredProducts = allProducts.filter((product) =>
    mar.includes(product.marca)
  );

  const marca = Array.from(
    new Set(allProducts.map((product) => product.marca))
  );

 

  const handleSort = (e) => {
    dispatch(sortProducts(e.target.value));
  };

  return (
    <section className="section-options">
      <h4>Ordenamiento</h4>
      <select onChange={handleSort}>
        <option value="asc">Menor a Mayor</option>
        <option value="desc">Mayor a Menor</option>
      </select>

      <h3>Categorias</h3>
      {/* tengo que modificar el componente CategoryOption  */}

      <form onSubmit={handleSubmit}>
        <ul>
          <li>Categoria</li>

          {categories.map((categoriaUnica, index) => (
            <li key={index}>
              <input
                type="checkbox"
                name="categoria"
                value={categoriaUnica}
                onChange={handleChange}
              />
              {categoriaUnica}
            </li>
          ))}
        </ul>
        <ul>
          {cate.length ? (
            <>
              <li>Marca</li>
              {cate.length
                ? cate.map((catego) => (
                    <React.Fragment key={cate}>
                      <li>{catego}</li>
                      {productsFilteredByCategory.map((marcaUnica, index) => (
                        <>
                          {catego === marcaUnica.categoria ? (
                            <li key={index}>
                              <input
                                type="checkbox"
                                name="marca"
                                value={marcaUnica.marca}
                                onChange={handleChange}
                              />
                              {marcaUnica.marca}
                            </li>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </React.Fragment>
                  ))
                : marca.map((marcaUnica, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        name="marca"
                        value={marcaUnica}
                        onChange={handleChange}
                      />
                      {marcaUnica}
                    </li>
                  ))}
            </>
          ) : (
            ""
          )}
        </ul>
        <button type="submit">Filtrar</button>
        <button type="button">Quitar Filtro</button>
      </form>
    </section>
  );
}

SectionOptions.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
