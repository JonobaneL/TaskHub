import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { firestoreDB } from ".";
import { TaskKeys } from "@/models/projectTypes";
import { NewGroupFormParams } from "@/models/formTypes";

export const getAllTables = (tablesID: string | null) => {
  if (!tablesID) return new Promise((_, rej) => rej());
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
  if (!tasksID) return new Promise((_, rej) => rej());
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
type NewTaskParams = {
  task: string;
  status: string | "none";
  due_date: string | null;
  priority: string | null;
  notes: string;
  conversation: null;
  tableID: string;
  author: string;
};
export const addTaskMethod = (tasksID: string, task: NewTaskParams) => {
  const collectionRef = collection(firestoreDB, tasksID);
  return addDoc(collectionRef, task);
};
export const addNewGroupMethod = (
  tablesID: string | null,
  table: NewGroupFormParams
) => {
  if (tablesID == null) return new Promise((_, rej) => rej());
  const collectionRef = collection(firestoreDB, tablesID);
  return addDoc(collectionRef, table);
};

export const deleteGroupMethod = (
  tableID: string,
  collectionID: string | null
) => {
  if (collectionID == null) return new Promise((_, rej) => rej());
  const docRef = doc(firestoreDB, collectionID, tableID);
  return deleteDoc(docRef);
};
