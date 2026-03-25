export type SubjectData = {
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

export type TaskDetail = {
  TaskName: string;
  Status: string;
  Due: string;
};
