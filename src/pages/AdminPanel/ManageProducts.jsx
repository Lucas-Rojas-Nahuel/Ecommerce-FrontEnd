import { useNavigate } from "react-router-dom";
import useProductCrud from "../../hooks/products/useProductCrud";
import "./ManageProducts.css";
import { useState } from "react";
 
export default function ManageProducts() {
  const { products, loading, error, deleteProduct } = useProductCrud(
    import.meta.env.VITE_REACT_APP_ROUTE_PRODUCTS
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm("¿Seguro que desea eliminar el producto?");
    if (confirmDelete){
      console.log(id)
      deleteProduct(id);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        window.location.reload();
      }, 3000);
      }
  };

  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="section-manageProduct">
      {/* Mensaje flotante */}
      {showSuccessMessage && (
        <div className="toast success-toast">Producto eliminado con éxito.</div>
      )}
      {error && <div className="toast error-toast">{error}</div>}
      <h3>Administrar Productos</h3>
      <div>
        <h1>Productos</h1>
        <button
          className="table-btn"
          style={{ marginBottom: "10px", backgroundColor: "#00b894" }}
          onClick={() => navigate("/create-product")}
        >
          Crear Producto
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Índice</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Fecha de Ingreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product._id}</td>
                <td>{product.nombre}</td>
                <td>{product.categoria}</td>
                <td>{product.marca}</td>
                <td>
                  ${new Intl.NumberFormat("es-AR").format(product.precio)}
                </td>
                <td>{product.stock}</td>
                <td>{new Date(product.fechaIngreso).toLocaleDateString()}</td>
                <td>
                  <button
                    className="table-btn"
                    onClick={() => handleEditProduct(product._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="table-btn"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
