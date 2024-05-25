import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestoreDB } from ".";
import { LablesTypeParams } from "@/models/RareUseTypes";
import { LableParams } from "@/models/projectTypes";

export const getProject = (id: string) => {
  const projectRef = doc(firestoreDB, "projects", id);
  return getDoc(projectRef);
};

export const updateLablesMethod = (
  projectID: string,
  type: LablesTypeParams,
  lables: LableParams[]
) => {
  const docRef = doc(firestoreDB, "projects", projectID);
  return updateDoc(docRef, {
    [type]: lables,
  });
};
