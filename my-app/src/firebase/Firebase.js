// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkngE0m3VoLvpwUEVEzHfHY4uR2_24DBM",
  authDomain: "stockapp-70485.firebaseapp.com",
  projectId: "stockapp-70485",
  storageBucket: "stockapp-70485.appspot.com",
  messagingSenderId: "278572097693",
  appId: "1:278572097693:web:9e9e53eed020e4a8bd7474",
  measurementId: "G-XZWPLRC1NE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
async function signInWithGoogle(){
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
async function logInWithEmailAndPassword(email, password){
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
async function signUpWithEmailAndPassword(name, email, password){
  
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {    
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name
      });
      addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });// ...
    })
    .catch((err) => {
     
      console.error(err);
      alert(err.message);
    }); 
  
};
async function sendPasswordReset(email){
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
async function logout() {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  sendPasswordReset,
  logout,
};