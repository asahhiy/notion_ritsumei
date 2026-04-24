import { SubjectData, taskProps } from "@/src/models/types/type";
import { getSubjectDetail } from "@/src/services/notion/getsubjectdetail";
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
        pageId: undefined,
        re_Subject_id: subjectData.pageId ?? "",
        re_Subject_name: "",
      }))

      setTasks(mappedTasks)
    } catch {
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


  const toggleComplete = (pageId: string) => {
    setTasks(prev => prev.map(
      t => t.pageId === pageId ? {
        ...t, Status: t.Status === "完了" ? "未完了" : "完了"
      } : t
    ))
  }

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
