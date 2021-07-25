export enum Role {
  admin = 'Admin',
  lecturer = 'Lecturer',
  student = 'Student',
}

export type Pagination = {
  limit: number;
  pageTotal: number;
};
