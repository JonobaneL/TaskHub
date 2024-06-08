import { TaskKeys } from "./projectTypes";

export type TaskResponseParams = {
  task: string;
  status: string | "none";
  due_date: string;
  priority: string | null;
  notes: string;
  commentsID: null;
  tableID: string;
};
export type UpdateTaskProps = {
  tableID: string | null;
  taskID: string | null;
  key: TaskKeys;
  value: any;
};
// export type CommentsResponse = {
//   comments: CommentParams[];
// };
export type AddNewTaskProps = {
  task: string;
  tableID: string;
  author?: string | null;
  due_date?: string | null;
  priority?: string | null;
  status?: string;
  notes?: string | null;
};
export type DeleteTaskProps = {
  taskID: string;
  tableID: string;
};
// export type AddCommentProps = {
//   tableID: string;
//   taskID: string;
//   commentsID: string | null;
//   comment: {
//     authorID: string;
//     content: string;
//   };
// };
// export type fetchCommentsProps = {
//   projectID: string | null;
//   tasks: TaskParams[];
// };
