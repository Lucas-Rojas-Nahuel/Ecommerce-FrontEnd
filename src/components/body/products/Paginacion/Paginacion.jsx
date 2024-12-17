/* eslint-disable react/prop-types */
 

import { Pagination } from "react-bootstrap";
import "./Paginacion.css";

export default function Paginacion({
  productosPorPagina,
  paginaActual,
  setPaginaAcutal,
  totalDeProductos,
}) {
  const cantidadDePaginas = Math.ceil(totalDeProductos / productosPorPagina);

  const paginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaAcutal(paginaActual - 1);
    }
  };

  const paginaSiguiente = () => {
    if (paginaActual < cantidadDePaginas) {
      setPaginaAcutal(paginaActual + 1);
    }
  };

  const numeroActual = (num) => {
    setPaginaAcutal(num);
  };

  const items = [];
  for (let number = 1; number <= cantidadDePaginas; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === paginaActual}
        onClick={() => numeroActual(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination size="sm" className="button justify-content-center">
      {paginaActual > 1 && <Pagination.Prev onClick={paginaAnterior} />}
      {items}
      {paginaActual < cantidadDePaginas && (
        <Pagination.Next onClick={paginaSiguiente} />
      )}
    </Pagination>
  );
}
