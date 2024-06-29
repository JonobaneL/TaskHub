import { ProjectParams } from "./projectTypes";

export type UserDetails = {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatar: string | null;
  projects: ProjectParams[] | null;
};
export type userResponse = {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatar: string | null;
  projects: string[] | null;
};
export type UserProps = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatar: string;
};
export type initialUserStateProps = {
  user: UserDetails;
  isLoading: boolean;
  error: null | string;
};

export type signUpProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type logInProps = {
  email: string;
  password: string;
};
