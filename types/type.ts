export type SubjectData = {
  pageId?: string;
  subjectName: string;
  when: string;
  day: string;
};

export const dayOrder: Record<string, number> = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
};

//Notion側のカラム名と一致する必要がある
export type TaskDetail = {
  TaskName: string;
  Status: string;
  Due: string;
  IsDue: string;
};

//科目情報更新用の型

export type UpdateSubjectData = {
  pageId: string;
  subjectName: string;
  semester: string;
  when: number;
  day: string;
  place: string;
  professor: string;
  syllabusUrl: string;
};
