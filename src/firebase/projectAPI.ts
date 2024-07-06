import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestoreDB } from ".";
import { LabelsTypeParams } from "@/models/RareUseTypes";
import { LabelParams } from "@/models/projectTypes";

export const getProject = (id: string) => {
  const projectRef = doc(firestoreDB, "projects", id);
  return getDoc(projectRef);
};

export const updateLabelsMethod = (
  projectID: string,
  type: LabelsTypeParams,
  labels: LabelParams[]
) => {
  const docRef = doc(firestoreDB, "projects", projectID);
  return updateDoc(docRef, {
    [type]: labels,
  });
};
export const getAllMembers = (projectID: string) => {
  const collectionRef = collection(firestoreDB, "users");
  const usersRef = query(
    collectionRef,
    where("projects", "array-contains", projectID)
  );
  return getDocs(usersRef);
};
