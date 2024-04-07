import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from ".";

export const getProject = (id: string) => {
  const projectRef = doc(firestoreDB, "projects", id);
  return getDoc(projectRef);
};
