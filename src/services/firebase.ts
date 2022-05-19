import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBIpqp3pHm69Nz-quIxLgBCGxyJQbR62ec",
  authDomain: "react1889.firebaseapp.com",
  projectId: "react1889",
  storageBucket: "react1889.appspot.com",
  messagingSenderId: "376310550623",
  appId: "1:376310550623:web:83739f0f94c2922bd6cbea",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const auth = getAuth(firebase);

export const signUp = async (email: string, password: string) =>
  await createUserWithEmailAndPassword(auth, email, password);

export const login = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);

export const logout = async () => await signOut(auth);

export const userRef = ref(database, "user");
export const chatsRef = ref(database, "chats");
export const getChatsById = (chatId: string) =>
  ref(database, `chats/${chatId}`);
export const getMessageListById = (chatId: string) =>
  ref(database, `chats/${chatId}/messageList/`);
