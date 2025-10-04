import { useState } from "react";
import { apiService } from "../services/apiService";
import useTodoList from "../store/useTodolist";

export const useDelete = () => {
  const [isError, setIsError] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const { list, removeList } = useTodoList((state) => state);

  const deleteData = async (id) => {
    try {
      setIsMutating(true);
      setIsError(false);

      // To debug the input parameters
      console.log("ID to be deleted:", id);

      // The default ID is string, so we convert it to a number
      const tableId = parseInt(id);

      // To get the actual ID from the API, we access the table ID from the list
      const todoItem = list[tableId - 1];

      // Ensure the item exists
      if (!todoItem) {
        throw new Error("Item not found at Id: " + tableId);
      }

      // Use the actual ID from the todo item for the API call
      const actualId = todoItem.id;

      console.log("Actual ID to be deleted:", actualId);

      // Call the API to delete the item
      const response = await apiService.delete(actualId);

      // Update the local state by removing the item
      removeList(id);
    } catch (e) {
      setIsError(true);
      throw e;
    } finally {
      setIsMutating(false);
    }
  };

  return {
    deleteData,
  };
};
