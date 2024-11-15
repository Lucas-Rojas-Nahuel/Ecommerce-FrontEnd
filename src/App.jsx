import "./App.css";
import {Routes, Route} from 'react-router-dom'
import { Header } from "./components/header/header";
import Home from "./pages/home"; 
import Products from "./pages/products";
import Offer from "./pages/offer";
import Fashion from "./pages/fashion";
import Household from "./pages/household";
import Sell from "./pages/sell";


function App() {
  return (
    <>
      <Header/>
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
