import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.css";
import useProductCrud from "./../../../../hooks/products/useProductCrud";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    marca: "",
    precio: 0,
    stock: 0,
    descripcion: "",
    imagen: [], // Para almacenar las imágenes seleccionadas
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const { createProduct, loading, error } = useProductCrud(
    import.meta.env.VITE_REACT_APP_ROUTE_PRODUCTS
  );

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Manejar selección de imágenes
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imagen: [...e.target.files],
    }));
  };

  //Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear el FormData
      const productData = new FormData();
      productData.append("nombre", formData.nombre);
      productData.append("categoria", formData.categoria);
      productData.append("marca", formData.marca);
      productData.append("precio", formData.precio);
      productData.append("stock", formData.stock);
      productData.append("descripcion", formData.descripcion);
      formData.imagen.forEach((file) => productData.append("imagen", file)); // Campo 'imagen' esperado por el backend

      // Hacer la solicitud al backend
      await createProduct(productData);

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/manageProducts");
      }, 4000); // Redirigir después de 3 segundos
    } catch (err) {
      console.error(err.message || "Error al crear el producto.");
    }
  };

  return (
    <section style={{ marginTop: "50px", marginBottom: "50px" }}>
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
          <label>Categoría:</label>
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
        <div>
          <label>Imágenes:</label>
          <input
            type="file"
            name="imagen"
            multiple
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Crear Producto"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {showSuccessMessage && (
        <div className="success-message">Producto creado con éxito.</div>
      )}
    </section>
  );
}
