import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";
import useTodoList from "../store/useTodolist";

export const useGet = () => {
  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setList } = useTodoList((state) => state);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      // Call the API to get all todo items
      const response = await apiService.getAll();
      const data = response.data;

      // Update the local state with the fetched data
      setGetData(response.data);
      setList(data);

      // To debug the response
      if (data && data.length > 0) {
        console.log("API GetAll's Response: ", data);
        console.log(`✅ Retrieved ${data.length} items`);
      }
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
