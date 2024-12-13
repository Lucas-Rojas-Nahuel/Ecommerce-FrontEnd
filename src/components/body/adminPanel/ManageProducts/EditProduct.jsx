import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductCrud from "./../../../../hooks/products/useProductCrud";
import "./CreateProduct.css";

export default function EditProduct() {
  const { products, updateProduct, error } = useProductCrud(
    import.meta.env.VITE_REACT_APP_ROUTE_PRODUCTS
  );
  const { id } = useParams();
  console.log(id)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    marca: "",
    precio: "",
    stock: "",
    descripcion: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const product = products.find((product) => product._id === id);

    if (product) {
      setFormData(product);
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
    updateProduct(formData._id, formData);
    setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/manageProducts");
      }, 3000); // Redirigir después de 3 segundos
    } catch (err) {
      console.error(err.message || "Error al editar el producto.");
    }
  };
  return (
    <section style={{ marginTop: "30px", marginBottom: "30px" }}>
      <form className="product-form" onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Categoria:</label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Marca:</label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualizar Producto</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {showSuccessMessage && (
        <div className="success-message">Producto editado con éxito.</div>
      )}
    </section>
  );}
