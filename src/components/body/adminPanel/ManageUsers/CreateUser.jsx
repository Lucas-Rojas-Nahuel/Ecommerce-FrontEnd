import { useState } from "react";
import useUserCrud from "../../../../hooks/users/useUserCrud";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const {createUser} = useUserCrud('http://localhost:3001/api/v1/usuarios')
  const [formData, setFormData] = useState({
    nombre: "",
    username: "",
    email: "",
    password: "",
    esAdmin: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(formData);
    navigate('/manageUsers')
    window.location.reload()
  };

  return (
    <section style={{ marginTop: "100px" }}>
      <form onSubmit={handleSubmit}>
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
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
            <label >Rol: </label>
            <select name="esAdmin" value={formData.esAdmin} onChange={handleChange} required>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
            </select>
        </div>
        <button type="submit">Crear Usuario</button>
      </form>
    </section>
  );
}


