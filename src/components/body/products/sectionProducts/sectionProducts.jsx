/* eslint-disable no-unused-vars */

import PropTypes from "prop-types";
import CardProducts from "./cardProducts/cardProducts";
import "./sectionProducts.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../../../../slices/productsSlice";
import Paginacion from "../Paginacion/Paginacion";

 
export default function SectionProducts({ filters }) {
  const { productsCopy } = useSelector((state) => state.products);
  const productosPorPagina = 4;
  const [paginaActual, setPaginaAcutal] = useState(1);
  const totalDeProductos = productsCopy.length;
   
  const ultimoIndice = paginaActual * productosPorPagina 
  const primerIndice = ultimoIndice - productosPorPagina
  
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/productos")
      .then((res) => dispatch(setAllProducts(res.data)))
      .catch((err) => console.error(err));
  }, [dispatch]);

  return (
    <section className="section-products">
      <div className="content-card">
        {productsCopy.map((product) => (
          <CardProducts
            key={product._id}
            id={product._id}
            imagen={product.imagen}
            nombre={product.nombre}
            precio={product.precio}
          />
        )).slice(primerIndice, ultimoIndice)}
      </div>
      <div>
        <Paginacion 
        productosPorPagina={productosPorPagina}
        paginaActual={paginaActual}
        setPaginaAcutal={setPaginaAcutal}
        totalDeProductos={totalDeProductos}/>
      </div>
    </section>
  );
}

SectionProducts.propTypes = {
  filters: PropTypes.shape({
    categoria: PropTypes.arrayOf(PropTypes.string),
    marca: PropTypes.arrayOf(PropTypes.string),
  }),
};
