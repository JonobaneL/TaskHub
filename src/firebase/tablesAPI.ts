import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestoreDB } from ".";
import { TaskKeys } from "@/models/projectTypes";

export const getAllTables = (tablesID: string | null) => {
  if (!tablesID) return;
  const collectionRef = collection(firestoreDB, tablesID);
  return getDocs(collectionRef);
};

export const updateTableMethod = (
  collectionID: string | null,
  tableID: string,
  key: "name" | "color",
  value: string
) => {
  if (!collectionID) return;
  const tableRef = doc(firestoreDB, collectionID, tableID);
  return updateDoc(tableRef, {
    [key]: value,
  });
};
export const getAllTasks = (tasksID: string | null) => {
  if (!tasksID) return;
  const tasksRef = collection(firestoreDB, tasksID);
  return getDocs(tasksRef);
};

export const updateTaskMethod = (
  collectionID: string | null,
  taskID: string | null,
  key: TaskKeys,
  value: string
) => {
  if (!collectionID || !taskID) return;
  const tableRef = doc(firestoreDB, collectionID, taskID);
  return updateDoc(tableRef, {
    [key]: value,
  });
};
