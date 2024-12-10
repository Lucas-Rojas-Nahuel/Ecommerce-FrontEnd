/* import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode"; */

 
 
import { useSelector } from "react-redux";



export default function Profile() {
  
  const { profile } = useSelector(
    (state) => state.auth
  );
  

  return (
    <div style={{ marginTop: '150px' }}>
        <h4>profileeeeee</h4>
      {profile ? (
        <>
          <h3>perfil de {profile.nombre}</h3>
          <p>email: {profile.email}</p>
        </>
      ) : (
        <p>cargando perfill...</p>
      )}
    </div>
  );
}

 
