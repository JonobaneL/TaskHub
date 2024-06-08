import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestoreDB } from ".";
import { CommentParams } from "@/models/commentTypes";

export const addCommentsMethod = (
  collectionID: string,
  comment: CommentParams
) => {
  const collectionRef = collection(firestoreDB, collectionID);
  return addDoc(collectionRef, {
    comments: [comment],
  });
};
export const getAllComments = (collectionID: string, docID: string) => {
  const docRef = doc(firestoreDB, collectionID, docID);
  return getDoc(docRef);
};
export const updateCommentsMethod = (
  collectionID: string,
  commentID: string,
  comments: CommentParams[]
) => {
  const docRef = doc(firestoreDB, collectionID, commentID);
  return updateDoc(docRef, {
    comments: comments,
  });
};
