/* import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode"; */

import PropTypes from "prop-types";
import useUserProfile from "../hooks/users/useUserProfile";



export default function Profile({ setIsAuthenticated}) {
  const {profile} = useUserProfile(setIsAuthenticated)
  
  

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

Profile.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};
