import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header/header";
import Home from "./pages/home";
import Products from "./pages/products";
import Offer from "./pages/offer";
import Fashion from "./pages/fashion";
import Household from "./pages/household";
import Sell from "./pages/sell";
import { useState } from "react";

import Registry from "./pages/registry/registry";

function App() {
  //funcion para que se muestre el login y el register
  const [isMoldalOpen, setIsModalOpen] = useState(false);
  const [isRegisterView, setIsRegisterView] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isMoldalOpen);
  };

  const toggleView = () => {
    setIsRegisterView(!isRegisterView);
  };

  return (
    <>
      {isMoldalOpen && (
        <Registry
          toggleModal={toggleModal}
          toggleView={toggleView}
          isRegisterView={isRegisterView}
        />
      )}
      <Header toggleModal={toggleModal} />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/fashion" element={<Fashion />}></Route>
        <Route path="/household" element={<Household />}></Route>
        <Route path="/sell" element={<Sell />}></Route>
      </Routes>
    </>
  );
}

export default App;
