import { useState } from "react";
import { taskProps } from "@/src/models/types/type";



export const useTaskViewModel = (initialTasks: taskProps[]) => {
  const [tasks, setTasks] = useState<taskProps[]>(initialTasks)

  const deleteTask = (id: string) => {
  }

}
