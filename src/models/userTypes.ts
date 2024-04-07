import { ProjectParams } from "./projectTypes";

export type userDetails = {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  projects: ProjectParams[] | null;
};
export type UserParams = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
};
