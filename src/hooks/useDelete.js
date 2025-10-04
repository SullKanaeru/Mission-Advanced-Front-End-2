import { useState } from "react";
import { apiService } from "../services/apiService";
import useTodoList from "../store/useTodolist";

export const useDelete = () => {
  const { removeList } = useTodoList((state) => state);

  const deleteData = async (id) => {
    try {
      setIsMutating(true);
      setIsError(false);

      // To debug the input parameters
      console.log("ID to be deleted:", id);

      // Call the API to delete the item
      await apiService.delete(id);

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
