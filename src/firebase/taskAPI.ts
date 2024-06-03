import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { firestoreDB } from ".";
import { CommentParams } from "@/models/projectTypes";

export const addCommentMethod = (
  collectionID: string,
  comment: CommentParams
) => {
  const collectionRef = collection(firestoreDB, collectionID);
  return addDoc(collectionRef, {
    comments: [comment],
  });
};
export const updateCommentsMethod = (
  collectionID: string,
  commentID: string,
  comment: CommentParams
) => {
  const docRef = doc(firestoreDB, collectionID, commentID);
  return updateDoc(docRef, {
    comments: arrayUnion(comment),
  });
};
export const getAllComments = (collectionID: string, docID: string) => {
  const docRef = doc(firestoreDB, collectionID, docID);
  return getDoc(docRef);
};
