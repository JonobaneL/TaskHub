import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestoreDB } from ".";
import { UserParams } from "@/models/userTypes";

export const addNewUser = (
  { firstName, lastName, email }: UserParams,
  uid: string
) => {
  return setDoc(doc(firestoreDB, "users", uid), {
    firstName,
    lastName,
    email,
  });
};

export const getUserInfo = (uid: string | null) => {
  const userRef = doc(firestoreDB, "users", uid || "");
  return getDoc(userRef);
};

export const getAllProjects = (userID: string | null) => {
  const collectionRef = collection(firestoreDB, "projects");
  const projectsQuery = query(
    collectionRef,
    where("members", "array-contains", userID)
  );
  return getDocs(projectsQuery);
};
