import { useState } from "react";
import { postData } from "../services/apiServices";

const usePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const makePostRequest = async (endpoint, data) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await postData(endpoint, data);
      setResponse(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, response, makePostRequest };
};

export default usePost;
