import { useNavigate } from "react-router-dom";
import useUserCrud from "../../hooks/users/useUserCrud";
import "./ManageProducts.css";
import usePagination from "../../hooks/usePagination";

export default function ManageUsers() {
  const { users, loading, error, deleteUser } = useUserCrud(
    import.meta.env.VITE_REACT_APP_ROUTE_USUARIOS
  );

  const usersPerPage = 7;

  const {
    displayedItems: displayedUsers,
    currentPage,
    totalPages,
    handlePageChange,
    handleNextPage,
    handlePreviousPage,
  } = usePagination(users, usersPerPage);

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
        <button
          className="table-btn"
          style={{ marginBottom: "10px", backgroundColor: "#00b894" }}
          onClick={() => navigate("/create-user")}
        >
          Crear Usuario
        </button>
        <table className="table">
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
            {displayedUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
                <td>{user._id}</td>
                <td>{user.nombre}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.esAdmin}</td>
                <td>
                  <button
                    className="table-btn"
                    onClick={() => handleEditUser(user._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="table-btn"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Paginación */}
        <div className="pagination-container">
          <button
            className="pagination-btn"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn ${
                page === currentPage ? "active" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
}
