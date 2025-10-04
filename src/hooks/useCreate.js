import { useState } from "react";
import { apiService } from "../services/apiService";
import useTodoList from "../store/useTodolist";

export const useCreate = () => {
  const [isMutating, setIsMutating] = useState(false);
  const [isError, setIsError] = useState(false);
  const { addList } = useTodoList((state) => state);


  const postData = async (todoData) => {
    try {
      setIsMutating(true);
      setIsError(false);

      // To debug the input parameters
      console.log("Data to be created:", todoData);

      // Call the API to create a new todo item
      const response = await apiService.create(todoData);

      // Update the local state with the new data
      setList(response.data);

      // To debug the response
      console.log("API Create's Response: ", response.data);

    } catch (e) {
      setIsError(true);
      console.log("error: ", e);
    } finally {
      setIsMutating(false);
    }
  };

  return {
    postData,
    isError,
    isMutating,
  };
};
