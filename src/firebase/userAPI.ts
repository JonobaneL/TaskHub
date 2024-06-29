import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestoreDB } from ".";
import { UserProps, UserDetails } from "@/models/userTypes";

export const addNewUser = (
  { firstName, lastName, email, avatar }: UserProps,
  uid: string
) => {
  return setDoc(doc(firestoreDB, "users", uid), {
    avatar,
    firstName,
    lastName,
    email,
  });
};
export const updateUserMethod = (
  key: keyof UserDetails,
  value: any,
  uid: string
) => {
  const docRef = doc(firestoreDB, "users", uid);
  console.log(key, value, uid);
  return updateDoc(docRef, {
    [key]: value,
  });
};

export const getUserInfo = (uid: string | null) => {
  const userRef = doc(firestoreDB, "users", uid || "");
  return getDoc(userRef);
};

export const getAllUserProjects = (projects: string[] | null) => {
  const collectionRef = collection(firestoreDB, "projects");
  const projectsQuery = query(
    collectionRef,
    where("projectID", "in", projects)
  );
  return getDocs(projectsQuery);
};
