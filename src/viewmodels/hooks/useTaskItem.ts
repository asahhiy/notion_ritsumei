import { taskProps } from "@/src/models/types/type";
import { useMemo } from "react";


export const useTaskItem = (task: taskProps) => {

  return useMemo(() => {
    const isCompleted = task.Status === "完了"
    const isOverdue = !isCompleted && task.IsDue === "Passed"

    return {
      isCompleted,
      isOverdue,
      cardOuterClassName: isOverdue ? "mx-4 my-1 flex flex-row shadow-sm" : "mx-4 my-1",
      cardInnerClassName: isCompleted
        ? "bg-gray-100 rounded-md p-4 shadow-sm"
        : isOverdue
          ? "bg-white p-4 flex-1 overflow-hidden rounded-r-lg"
          : "bg-white rounded-md p-4 shadow-sm",
      titleClassName: isCompleted
        ? "text-lg font-inter-bold line-through text-zinc-500"
        : "text-lg font-inter-bold",
      dateTextClassName: isOverdue ? "ml-1 text-red-400" : "ml-1",
      dateIconColor: isOverdue ? "red" : "black",
      accentClassName: isOverdue ? "bg-red-400 w-[3px]" : "",
    }

  }, [task.Status, task.IsDue])

}
