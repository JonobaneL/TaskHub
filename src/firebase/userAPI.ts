import { doc, getDoc, setDoc } from "firebase/firestore";
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
