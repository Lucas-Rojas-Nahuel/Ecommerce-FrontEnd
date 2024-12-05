import "./App.css";
import { Routes, Route } from "react-router-dom";
import useUserRole from "./hooks/users/useUserRole.js"; 
import { useState } from "react";

//Paginas públicas
import Home from "./pages/home";
import Products from "./pages/products";
import Registry from "./pages/registry/registry";
import Offer from "./pages/offer";
import ContactUs from "./pages/ContactUs.jsx";

//Paginas de usuarios registrados
import UserViews from "./pages/userViews/UserViews.jsx";
import Sell from "./pages/userViews/sell.jsx";
import WishList from "./pages/userViews/WishList.jsx";

//paginas para administrador
import AdminPanel from "./pages/AdminPanel/AdminPanel.jsx";
import ControlPanel from "./pages/AdminPanel/ControlPanel.jsx";
import ManageProducts from "./pages/AdminPanel/ManageProducts.jsx";
import ManageOrders from "./pages/AdminPanel/ManageOrders.jsx";
import ManageUsers from "./pages/AdminPanel/ManageUsers.jsx";
import ManageDiscounts from "./pages/AdminPanel/ManageDiscounts.jsx";
import ManageReviews from "./pages/AdminPanel/ManageReviews.jsx";

//pagina para usuario y administrador
import Profile from "./pages/Profile.jsx";

//componentes globales
import { Header } from "./components/header/header";

//pagina no autorizada
import Unauthorized from "./pages/Unauthorized.jsx";
import CreateUser from "./components/body/adminPanel/ManageUsers/CreateUser.jsx";
import EditUser from "./components/body/adminPanel/ManageUsers/EditUser.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProductInfo from "./components/body/products/productInformation/ProductInfo.jsx";
import { useSelector } from "react-redux";

function App() {
  //funcion para que se muestre el login y el register
  const isActive = useSelector((state) => state.btnModal.isActive);

  //estado para ver el rol del usuario solo duevuelve true o false

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

 

  //verificamos el rol
  const { role } = useUserRole(); 
  

  return (
    <AuthProvider>
      {isActive && <Registry setIsAuthenticated={setIsAuthenticated} />}
      <Header setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {isAuthenticated ? (
          <>
            {/* Rutas para usuarios */}
            {role === "user" && (
              <>
                <Route
                  path="/userView"
                  element={
                    <UserViews setIsAuthenticated={setIsAuthenticated} />
                  }
                />
                <Route
                  path="/profile"
                  element={<Profile setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/offer" element={<Offer />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/wishList" element={<WishList />} />
              </>
            )}

            {/* Rutas para administradores */}
            {role === "admin" && (
              <>
                <Route
                  path="/adminView"
                  element={
                    <AdminPanel setIsAuthenticated={setIsAuthenticated} />
                  }
                />
                <Route
                  path="/profile"
                  element={<Profile setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route path="/controlPanel" element={<ControlPanel />} />
                <Route path="/manageProducts" element={<ManageProducts />} />
                <Route path="/manageOrders" element={<ManageOrders />} />
                <Route path="/manageUsers" element={<ManageUsers />} />
                <Route path="/manageDiscounts" element={<ManageDiscounts />} />
                <Route path="/manageReviews" element={<ManageReviews />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/edit-user/:id" element={<EditUser />} />
              </>
            )}
          </>
        ) : (
          <>
            {/* Rutas públicas */}
            {!role && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductInfo />} />
                <Route path="/offer" element={<Offer />} />
                <Route path="/contactUs" element={<ContactUs />} />
                <Route path="*" element={<Unauthorized />} />
              </>
            )}
          </>
        )}
      </Routes>
    </AuthProvider>
  );
}

export default App;
