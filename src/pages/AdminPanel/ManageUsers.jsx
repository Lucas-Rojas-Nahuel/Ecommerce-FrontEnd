import { useNavigate } from "react-router-dom";
import useUserCrud from "../../hooks/users/useUserCrud";
import "./ManageUsers.css";

export default function ManageUsers() {
  const { users, loading, error, deleteUser } = useUserCrud(
    "http://localhost:3001/api/v1/usuarios"
  );

  const navigate = useNavigate();

  const handleDeleteUser = (id) => {
    deleteUser(id);
    window.location.reload();
  };

  const handleEditUser = (id) => {
    navigate(`/edit-user/${id}`);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="section-manageUsers">
      <h3>Administrar Usuarios</h3>
      <div>
        <h1>usuarios</h1>
        <button onClick={() => navigate("/create-user")}>Crear Usuario</button>
        <table>
          <thead>
            <tr>
              <th>Íncice</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Nombre de Usuario</th>
              <th>Gmail</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.nombre}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.esAdmin}</td>
                <td>
                  <button onClick={() => handleEditUser(user._id)}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteUser(user._id)}>
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
