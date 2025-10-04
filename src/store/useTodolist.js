import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useTodoList = create(
  persist(
    (set) => ({
      list: [],
      setList: (data) =>
        set((state) => ({
          list: [...state.list, data],
        })),
      updateList: (index, data) =>
        set((state) => {
          const newData = [...state.list];
          newData[index] = data;
          return {
            list: newData,
          };
        }),
      removeList: (index) => {
        set((state) => {
          const newData = [...state.list];
          newData.splice(index - 1, 1);
          return {
            list: newData,
          };
        });
      },
    }),
    {
      name: "todolist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTodoList;
