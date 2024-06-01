import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestoreDB } from ".";
import { TaskKeys } from "@/models/projectTypes";

export const getAllTables = (tablesID: string) => {
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
export const getAllTasks = (tasksID: string) => {
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
  notes: string | null;
  commentsID: null;
  tableID: string;
  author: string;
};
export const addTaskMethod = (tasksID: string, task: NewTaskParams) => {
  const collectionRef = collection(firestoreDB, tasksID);
  return addDoc(collectionRef, task);
};
export const deleteTaskMethod = (taskID: string, tasksID: string | null) => {
  if (tasksID == null) return new Promise((_, rej) => rej());
  const docRef = doc(firestoreDB, tasksID, taskID);
  return deleteDoc(docRef);
};
type NewGroupFormParams = {
  color: string;
  name: string;
  id: string;
};
export const addNewGroupMethod = (
  tablesID: string | null,
  table: NewGroupFormParams
) => {
  if (tablesID == null) return new Promise((_, rej) => rej());
  const docRef = doc(firestoreDB, tablesID, table.id);
  return setDoc(docRef, { name: table.name, color: table.color });
};

export const deleteGroupMethod = (
  tableID: string,
  collectionID: string | null
) => {
  if (collectionID == null) return new Promise((_, rej) => rej());
  const docRef = doc(firestoreDB, collectionID, tableID);
  return deleteDoc(docRef);
};
