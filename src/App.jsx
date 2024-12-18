import "./App.css";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import useUserRole from "./hooks/users/useUserRole.js";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./slices/authSlice.js";

//Paginas públicas
import Home from "./pages/home";
import Products from "./pages/products";
import Registry from "./pages/registry/registry";
/* import Offer from "./pages/offer";
import ContactUs from "./pages/ContactUs.jsx";*/
import ProductInfo from "./components/body/products/productInformation/ProductInfo.jsx"; 
import Cart from "./components/body/Cart/Cart.jsx";

//Paginas de usuarios registrados
/* import UserViews from "./pages/userViews/UserViews.jsx";
import Sell from "./pages/userViews/sell.jsx";
import WishList from "./pages/userViews/WishList.jsx"; */
import ProductOrders from "./components/body/userViews/productOrders/ProductOrders.jsx";
import SuccessPage from "./pages/Notifications/SuccessPage.jsx";
import FailurePage from "./pages/Notifications/FailurePage.jsx";
import PendingPage from "./pages/Notifications/PendingPage.jsx";

//paginas para administrador
/* import ControlPanel from "./pages/AdminPanel/ControlPanel.jsx";
import ManageOrders from "./pages/AdminPanel/ManageOrders.jsx";
import ManageDiscounts from "./pages/AdminPanel/ManageDiscounts.jsx";
import ManageReviews from "./pages/AdminPanel/ManageReviews.jsx"; */
import AdminPanel from "./pages/AdminPanel/AdminPanel.jsx";
import ManageProducts from "./pages/AdminPanel/ManageProducts.jsx";
import ManageUsers from "./pages/AdminPanel/ManageUsers.jsx";
import CreateUser from "./components/body/adminPanel/ManageUsers/CreateUser.jsx";
import EditUser from "./components/body/adminPanel/ManageUsers/EditUser.jsx";
import CreateProduct from "./components/body/adminPanel/ManageProducts/CreateProduct";
import EditProduct from "./components/body/adminPanel/ManageProducts/EditProduct.jsx";

//pagina para usuario y administrador
import Profile from "./pages/Profile.jsx";

//componentes globales
import { Header } from "./components/header/header";
import Footer from "./pages/footer.jsx";

//pagina no autorizada
import Unauthorized from "./pages/Unauthorized.jsx";
import {
  setPageActive,
  setPageInative,
} from "./features/OrdenCreate/OrdenCreate.js";

function App() {
  //funcion para que se muestre el login y el register
  const isActive = useSelector((state) => state.btnModal.isActive);

  //slice para ver si esta autentificado el usuario
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(fetchUserProfile());
    }
    const activePaths = ["/product-orders", "/success", "/failure", "/pending"];
    const isDynamicProductOrder = matchPath(
      "/product-orders/:id",
      location.pathname
    );
    if (activePaths.includes(location.pathname) || isDynamicProductOrder) {
      dispatch(setPageActive());
    } else {
      dispatch(setPageInative());
    }
  }, [dispatch, isAuthenticated, location]);

  //verificamos el rol
  const { role } = useUserRole();

  const isPageActive = useSelector((state) => state.isOrden.activePage);

  return (
    <AuthProvider>
      {isActive && <Registry />}
      {!isPageActive && <Header />}

      <section className="section-conten">
        <Routes>
          {isAuthenticated ? (
            <>
              {/* Rutas para usuarios */}
              {role === "user" && (
                <>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductInfo />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/product-orders" element={<ProductOrders />} />
                  <Route
                    path="/product-orders/:id"
                    element={<ProductOrders />}
                  />
                  <Route path="/success" element={<SuccessPage />} />
                  <Route path="/failure" element={<FailurePage />} />
                  <Route path="/pending" element={<PendingPage />} />
                  <Route path="*" element={<Unauthorized />} />
                </>
              )}

              {/* Rutas para administradores */}
              {role === "admin" && (
                <>
                  <Route path="/adminView" element={<AdminPanel />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/manageProducts" element={<ManageProducts />} />
                  <Route path="/create-product" element={<CreateProduct />} />
                  <Route path="/edit-product/:id" element={<EditProduct />} />
                  <Route path="/manageUsers" element={<ManageUsers />} />
                  <Route path="/create-user" element={<CreateUser />} />
                  <Route path="/edit-user/:id" element={<EditUser />} />
                  <Route path="*" element={<Unauthorized />} />
                </>
              )}
            </>
          ) : (
            <>
              {/* Rutas públicas */}
              {!role && (
                <>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductInfo />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<Unauthorized />} />
                </>
              )}
            </>
          )}
        </Routes>
        {!isPageActive && <Footer />}
      </section>
    </AuthProvider>
  );
}

export default App;
