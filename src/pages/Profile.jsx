/* import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode"; */

import PropTypes from "prop-types";
import useUserProfile from "../hooks/users/useUserProfile";



export default function Profile({ setIsAuthenticated}) {
  const {profile} = useUserProfile(setIsAuthenticated)
  
  
  /* const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.error("token no encontrado");
        setIsAuthenticated(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        if(!decodedToken || !decodedToken.id){
            throw new Error("Token inválido o incompleto");
        }
        console.log(decodedToken);
        
        const userId = decodedToken.id;
        const response = await axios.get(
          `http://localhost:3001/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(response.data.user);
        
      } catch (error) {
        console.error("error al decodificar el token: ", error);
        setIsAuthenticated(false);
      }
    };
    fetchProfile();
  }, [setIsAuthenticated]);

  */

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.reload();
  }; 

  return (
    <div style={{ marginTop: '150px' }}>
        <h4>profileeeeee</h4>
      {profile ? (
        <>
          <h3>perfil de {profile.name}</h3>
          <p>email: {profile.email}</p>
          <button onClick={handleLogout}>logout</button>
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
