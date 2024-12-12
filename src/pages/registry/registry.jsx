 
import Register from "./register";
import Login from "./login";
import './registry.css'
import { useSelector } from "react-redux";

export default function Registry() {
  
  const isRegisterView = useSelector((state) => state.btnModal.isRegisterView)
  

  return (
    <div className="modal-overlay" onClick={(e) =>{
        e.stopPropagation();
         
    }}>
      <div className="model-content">
        {isRegisterView ? (
            <Login   />
        ) : (
            <Register />
        )}
      </div>
    </div>
  );
}

 