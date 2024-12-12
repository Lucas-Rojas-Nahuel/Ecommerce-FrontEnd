import { useParams } from "react-router-dom";
import "./ProductInfo.css";
import useProductCrud from "../../../../hooks/products/useProductCrud";


export default function ProductInfo() {
  const { id } = useParams(); //obtenemos el id desde la URL
  const { products, loading, error,  } = useProductCrud(
    import.meta.env.VITE_REACT_APP_ROUTE_PRODUCTS
  );

  //busca el producto en la lista de productos
  const product= products.find((item) => item._id === id)
   

  console.log(product)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if(!product) return <p>Producto no encontrado</p>

  

  return (
    <section className="section-product-info">
      <article className="product-info">
        <figure className="content-img-product">
          <img src={product.imagen} alt="" />
        </figure>

        {/* Información del producto */}
        <section className="content-info-product">
          <h2 className="title-product-info">{product.nombre}</h2>
          <hr />
          <p className="price-product"><strong>Precio: $</strong>{product.precio}</p>
          <hr />
          <p className="descrip-product">Descripción: {product.descripcion}</p>
          <hr />
          <span>Stock: {product.stock} unidades disponibles</span>
          <hr />
          <footer className="content-btn-product">
            <button>Añadir a carrito</button>
            <button>Añadir a favoritos</button>
          </footer>
        </section>
      </article>
    </section>
  );
}
