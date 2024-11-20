import { useEffect, useState } from "react";
import { fetchData } from "../services/apiServices";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        setIsLoading(true);
        const result = await fetchData(endpoint);
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataFromAPI();
  }, [endpoint]);
  return { data, isLoading, error };
};

export default useFetch;
