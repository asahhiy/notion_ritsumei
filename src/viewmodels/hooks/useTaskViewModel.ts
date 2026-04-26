import { SubjectData, taskProps } from "@/src/models/types/type";
import { getSubjectDetail } from "@/src/services/notion/getsubjectdetail";
import { updateTaskStatus } from "@/src/services/notion/updateTaskStatus";
import { useCallback, useEffect, useMemo, useState } from "react";

//この関数は科目からタスクが出るので、科目名はあえて渡さない
export const useTaskViewModel = (subjectData: SubjectData) => {
  const [tasks, setTasks] = useState<taskProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setIsError(false)

    try {
      const detailTasks = await getSubjectDetail(subjectData)
      const mappedTasks: taskProps[] = detailTasks.map((task) => ({
        ...task,
        pageId: task.pageId,
        re_Subject_id: subjectData.pageId ?? "",
        re_Subject_name: "",
      }))

      setTasks(mappedTasks)
    } catch (error) {
      console.error("Failed to fetch tasks", error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [subjectData])

  useEffect(() => {
    fetchData()
  }, [fetchData])


  const activeTasks = useMemo(() => {
    return tasks.filter(task => task.Status !== "完了")
  }, [tasks])

  const completedTasks = useMemo(() => {
    return tasks.filter(task => task.Status === "完了")
  }, [tasks])

  const overDueTasks = useMemo(() => {
    return tasks.filter(task => task.Status !== "完了" && task.IsDue === "Passed")
  }, [tasks])


  const toggleComplete = useCallback(async (pageId: string) => {
    const targetTask = tasks.find(task => task.pageId === pageId)
    if (!targetTask) {
      return
    }

    const previousStatus = targetTask.Status
    const nextStatus = previousStatus === "完了" ? "未着手" : "完了"

    setTasks(prev => prev.map(
      task => task.pageId === pageId ? {
        ...task,
        Status: nextStatus,
      } : task
    ))

    try {
      await updateTaskStatus(pageId, nextStatus)
    } catch (error) {
      setTasks(prev => prev.map(
        task => task.pageId === pageId ? {
          ...task,
          Status: previousStatus,
        } : task
      ))
      console.error("Failed to update task status", error)
    }
  }, [tasks])

  return {
    tasks,
    activeTasks,
    completedTasks,
    overDueTasks,
    isLoading,
    isError,
    refetch: fetchData,
    toggleComplete,
  }
}
