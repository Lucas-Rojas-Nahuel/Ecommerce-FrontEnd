import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const useUserCrud = (initialUrl) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {token} = useAuth();

    //(GET) obtener usuarios
    const fetchUsers = useCallback( async () => {
       
        setLoading(true);
        try {
            const response = await axios.get(initialUrl);
            setUsers(response.data);
            setError(null);
        } catch (error) {
            setError(error);
        }finally{
            setLoading(false);
        }
    }, [initialUrl]);

    //(POST) crear usuario
    const createUser = useCallback( async (userData) => {
        setLoading(true);
        try {
            const response = await axios.post(initialUrl, userData);
            setUsers((prevUsers) =>[...prevUsers, response.data])
            setError(null);
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
    },[initialUrl])

    //(PUT) actualizar usuario
    const updateUser = useCallback( async (id, updatedData) => {
        setLoading(true);
        
        try {
            const response = await axios.put(`${initialUrl}/${id}`, updatedData, {
                headers: {
                    'Authorization':`Bearer ${token}`
                }
            });
            setUsers((prevUsers)=> prevUsers.map(user => (user.id === id ? response.data : user)));
            setError(null)
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
    },[initialUrl, token])

    //(DELETE) borrar usuario
    const deleteUser = useCallback( async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${initialUrl}/${id}`);
            setUsers((prevUsers)=>prevUsers.filter(user => user.id !== id));
            setError(null)
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
    }, [initialUrl])

    useEffect(()=>{
        fetchUsers();
    }, [fetchUsers]);

    return {users, loading, error, fetchUsers, createUser, updateUser, deleteUser}
}
export default useUserCrud;