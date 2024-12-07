/* eslint-disable react/prop-types */

import "./Paginacion.css";

export default function Paginacion({
  productosPorPagina,

  paginaActual,
  setPaginaAcutal,
  totalDeProductos,
}) {
  const cantidadDePaginas = Math.ceil(totalDeProductos / productosPorPagina);
  const numeroDePagina = [];
  for (let i = 0; i < cantidadDePaginas; i++) {
    numeroDePagina.push(i + 1);
  }

  const paginaAnterior = () => {
    setPaginaAcutal(paginaActual - 1);
  };

  const paginaSiguiente = () => {
    setPaginaAcutal(paginaActual + 1);
  };

  const numeroActual = (num) => {
    setPaginaAcutal(num);
  };

   
  return (
    <div className="button">
      {paginaActual === 1 ? null : (
        <button onClick={paginaAnterior}>prev</button>
      )}

      {numeroDePagina.map((num) => (
        <button className={num === paginaActual ? 'currPage' : ''} onClick={() => numeroActual(num)} key={num}>
          {num}
        </button>
      ))}
      {paginaActual === cantidadDePaginas ? null : (
        <button onClick={paginaSiguiente}>next</button>
      )}
    </div>
  );
}
