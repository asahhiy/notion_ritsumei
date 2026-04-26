export type SubjectData = {
  pageId?: string;
  subjectName: string;
  when: string;
  day: string;
  place: string;
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
  pageId?: string;
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

//登録科目取得のクエリ用の型
export type LessonQueryProps = {
  day: string;
  period: number;
  term: string;
};

export type LessonDataMasterProps = {
  id: string;
  fullName: string;
  instructor: string;
  room: string;
  syllabusUrl: string;
  term: string;
  day: string;
  period: number;
};

export type taskProps = {
  re_Subject_id: string;
  re_Subject_name: string;
  pageId?: string
} & TaskDetail

