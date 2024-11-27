import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

const useUserProfile = (setIsAutheticated) => {
  const [profile, setProfile] = useState(null);
  const [laoding, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("token no encontrado");
        setError("Token no encontrado");
        setIsAutheticated(false);
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        if (!decodedToken || !decodedToken.id) {
          throw new Error("token invalido o incompleto");
        }

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
        setError("Error al obtener el perfil del usuario");
        setIsAutheticated(false);
      } finally {
        setLoading(false)
      }
    };

    fetchProfile();
  }, [setIsAutheticated]);

  return {profile, laoding, error}
};

export default useUserProfile;