import { useState, useEffect } from "react";
import apiClient from "../services/apiServices";

const useFetchProduct = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response= await apiClient.get('/products');
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);
  return { data, isLoading, error };
};

export default useFetchProduct;