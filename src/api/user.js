import db, { auth } from "@service/firebase";
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
  setDoc
} from "firebase/firestore";
import { signOut } from "firebase/auth";

const USER_COLLECTION = "users";

export const getUserByUID = async (uid) => {
  let docRef = doc(db, USER_COLLECTION, uid);
  let docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  } else {
    return false;
  }
};

export const getUserByEmail = async (email) => {
  let q = query(collection(db, USER_COLLECTION), where("email", "==", email));
  let docSnaps = await getDocs(q);
  if (docSnaps.docs.length > 0) {
    let userDoc = docSnaps.docs[0];
    return {
      id: userDoc.id,
      ...userDoc.data()
    };
  } else {
    return false;
  }
};

export const createUser = async (userData) => {
  let docRef = doc(db, USER_COLLECTION, userData.uid);
  await setDoc(docRef, userData);
};

export const logout = () => {
  signOut(auth);
};
