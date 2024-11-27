import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react"


const useUserRole = () => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const getRole = () => {
            const token = localStorage.getItem('token');

            if(!token){
                setError('token no encontrado')
                setLoading(false);
                return;
            }

            try {
                const decodedToken = jwtDecode(token)
                    if(!decodedToken || !decodedToken.role){
                        throw new Error('token invalido o incompleto');
                    }
                    setRole(decodedToken.role);
                
            } catch (error) {
                setError('error al decodificar el token');
                console.error(error)
            } finally {
                setLoading(false);
            }
        }
        getRole()
    }, []);
    return {role, loading , error}
}

export default useUserRole;