import { useState } from "react";
import { apiService } from "../services/apiService";
import useTodoList from "../store/useTodolist";

export const useUpdate = () => {
  const [isMutating, setIsMutating] = useState(false);
  const [isError, setIsError] = useState(false);
  const { list, updateList } = useTodoList((state) => state);

  const putData = async (Id, updateData) => {
    try {
      setIsMutating(true);
      setIsError(false);

      // To debug the input parameters
      console.log("Array Id:", Id, "Data:", updateData);

      // The default ID is string, so we convert it to a number
      const tableId = parseInt(Id);

      // To get the actual ID from the API, we access the table ID from the list
      const todoItem = list[tableId];

      // Ensure the item exists
      if (!todoItem) {
        throw new Error("Item not found at Id: " + tableId);
      }

      // Use the actual ID from the todo item for the API call
      const actualId = todoItem.id;

      // Call the API to update the item
      const response = await apiService.update(actualId, updateData);

      // Update the local state with the new data
      updateList(tableId, response.data);

      // To debug the response
      console.log("API Update's Response: ", response.data);
    } catch (e) {
      setIsError(true);
      console.error("Update error:", e);
      throw e;
    } finally {
      setIsMutating(false);
    }
  };

  return {
    putData,
  };
};
