import useFetchProduct from "./../../../../../hooks/useFetchProduct";
import "./cardProducts.css";

export default function CardProducts() {
  const { data, isLoading, error } = useFetchProduct();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <>
      {data.map((product) => (
        <div className="prueba" key={product.id}>
          <div className="container" >
            <img src={product.image} className="img-product" alt="" />

            <h3 className="title-product">{product.title}</h3>
            <div className="container-price-btn">
              <p>${product.price}</p>
              <button>
                <i className="fi fi-sr-shopping-cart-add"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
