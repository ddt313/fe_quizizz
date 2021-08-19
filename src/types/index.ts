export enum Role {
  admin = 'Admin',
  lecturer = 'Lecturer',
  student = 'Student',
}

export type Pagination = {
  limit: number;
  pageTotal: number;
};

export type QuestionTable = {
  _id: string;
  content: string;
  level: number;
  module: string;
  user: string;
  chapter: string;
};

export type SelectBoxType = {
  _id: string;
  name: string;
};
