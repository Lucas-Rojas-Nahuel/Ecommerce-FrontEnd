import "./productsOutstanding.css";

export default function ProductsOutstanding() {
  const products = [
    {
      _id: "6758d0d55e0730697fae2367",
      name: "Producto 1",
      image: `${
        import.meta.env.VITE_REACT_APP_ROUTE_IMAGES
      }/imagen-1733873877781.png`,
      link: "/products/6758d0d55e0730697fae2367",
    },
    {
      id: "6758ceb95e0730697fae235d",
      name: "Tecaldo Mecánico",
      image: `${
        import.meta.env.VITE_REACT_APP_ROUTE_IMAGES
      }/imagen-1733873337903.png`,
      link: "/products/6758ceb95e0730697fae235d",
    },
    {
      id: "6758c92f5e0730697fae232e",
      name: "Producto 3",
      image: `${
        import.meta.env.VITE_REACT_APP_ROUTE_IMAGES
      }/imagen-1733871919266.png`,
      link: "/products/6758c92f5e0730697fae232e",
    },
    {
      id: "675b77f9f310b4471021ae95",
      name: "Producto 4",
      image: `${
        import.meta.env.VITE_REACT_APP_ROUTE_IMAGES
      }/imagen-1734047737031.png`,
      link: "/products/675b77f9f310b4471021ae95",
    },
    {
      id: "6758cb565e0730697fae233d",
      name: "Producto 5",
      image: `${
        import.meta.env.VITE_REACT_APP_ROUTE_IMAGES
      }/imagen-1733872470182.png`,
      link: "/products/6758cb565e0730697fae233d",
    },
  ];

  return (
    <section className="section-slider-outstanding">
      <div className="scroll-wrapper">
        <div className="scroll-content-outstanding">
          {products.map((product) => (
            <a
              key={product.id}
              href={product.link}
              className="card-outstanding"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="card-image"
              />
            </a>
          ))}

          {products.map((product) => (
            <a
              key={`${product.id}-duplicate`}
              href={product.link}
              className="card-outstanding"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="card-image"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
