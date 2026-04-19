import getNotionClient from "../auth/getNotionClient";
import { taskProps } from "@/src/models/types/type";

export function addtask(task: taskProps) {

  const notion = getNotionClient()


  notion.pages.create({

  })
  return "hogehoge"
}
