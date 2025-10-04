import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";
import useTodoList from "../store/useTodolist";

export const useGet = () => {
  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      // Call the API to get all todo items
      const response = await apiService.getAll();

      // Update the local state with the fetched data
      setGetData(response.data);

      // To debug the response
      console.log("API GetAll's Response: ", response.data);
    } catch (e) {
      setIsError(true);
      console.log("error: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    getData,
    setGetData,
    isError,
    isLoading,
    refetch: fetchData,
  };
};
