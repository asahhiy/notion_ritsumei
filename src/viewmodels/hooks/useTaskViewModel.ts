import { useState, useMemo } from "react";
import { taskProps } from "@/src/models/types/type";
import getSubjectList from "@/src/services/notion/getsubjectlist";
import { getSubjectDetail } from "@/src/services/notion/getsubjectdetail";


export const useTaskViewModel = (initialTasks: taskProps[]) => {
  const [tasks, setTasks] = useState<taskProps[]>(initialTasks)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)


  const fetchData = async () => {
    setIsLoading(true)
    try {
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }


  }


  const activeTasks = useMemo(() => {
    tasks.filter(task => task.Status !== "完了")
  }, [tasks])

  const completedTasks = useMemo(() => {
    tasks.filter(task => task.Status === "完了")
  }, [tasks])

  const overDueTasks = useMemo(() => {
    tasks.filter(task => task.Status !== "完了" && task.IsDue === "passed")
  }, [tasks])


  const toggleComplete = (pageId: string) => {
    setTasks(prev => prev.map(
      t => t.pageId === pageId ? {
        ...t, Status: t.Status === "完了" ? "未完了" : "完了"
      } : t
    ))
  }

  return { activeTasks, completedTasks, overDueTasks, toggleComplete }
}
