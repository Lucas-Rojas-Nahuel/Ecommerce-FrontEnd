import axios from "axios";
import { useCallback, useEffect, useState } from "react"


const useProductCrud = (initialUrl) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Leer (GET) productos
    const fetchProduct = useCallback(async () =>{
        setLoading(true);
        try {
            const response = await axios.get(initialUrl);
            setProducts(response.data);
            setFilteredProducts(response.data);
            setError(null);
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
    }, [initialUrl])

    /* //Leer por id (GET) product
    const getByIdProduct = useCallback(async (id)=>{
        setLoading(true);
        try {
            const product = await axios.get(initialUrl);
            const response = product.data.find((item) => item._id === id)
            setProducts(response.data);
            setFilteredProducts(response.data);
            setError(null)
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
    }, [initialUrl]) */

    // Crear (POST) productos
    const createProduct = useCallback(async (productData) => {
        setLoading(true);
        try {
            const response = await axios.post(initialUrl, productData);
            setProducts((prevProducts) => [...prevProducts, response.data]);
            setFilteredProducts((prevProducts) => [...prevProducts, response.data]);
            setError(null)
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false);
        }
    }, [initialUrl])

    //Actualizar (PUT) productos
    const updateProduct = useCallback(async (id, updatedData) => {
        setLoading(true);
        try {
            const response = await axios.put(`${initialUrl}/${id}`, updatedData);
            setProducts((prevProducts) => prevProducts.map(product => (product.id === id ? response.data: product)));
            setFilteredProducts((prevProducts) => prevProducts.map(product => (product.id === id ? response.data: product)));
            setError(null)
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false);
        }
    }, [initialUrl])

    //Borrar (DELETE) productos
    const deleteProduct = useCallback(async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${initialUrl}/${id}`)
            setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
            setFilteredProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
            setError(null)
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
    }, [initialUrl])

    //Filtrar productos
    const filterProducts = (filter) => {
        let tempProducts = products;
        if(filter.categoria.length){
            tempProducts = tempProducts.filter(product => filter.categoria.includes(product.categoria))
        }
        if(filter.marca.length){
            tempProducts = tempProducts.filter(product=> filter.marca.includes(product.marca));
        }
        setFilteredProducts(tempProducts);
    };

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct])

    return {products: filteredProducts, loading, error, fetchProduct , createProduct, updateProduct, deleteProduct, filterProducts}
};

export default useProductCrud;