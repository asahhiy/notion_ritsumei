import { useMemo } from "react";
import { taskProps } from "@/src/models/types/type";


export const useTaskItem = (task: taskProps) => {

  return useMemo(() => {
    const isCompleted = task.Status === "完了"
    const isOverdue = !isCompleted && task.IsDue === "Passed"

    return {
      isCompleted,
      isOverdue,
      containerStyle: isCompleted ? "bg-gray-100" : "bg-white",
      textStyle: isCompleted ? "line-through text-zinc-500" : "text-secondary",
      dateColor: isOverdue ? "text-red-400" : "text-tertiary",
      accentColor: isOverdue ? "bg-red-400" : "bg-primary"
    }

  }, [task.Status, task.IsDue])

}
