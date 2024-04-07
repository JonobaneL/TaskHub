import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestoreDB } from ".";

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
