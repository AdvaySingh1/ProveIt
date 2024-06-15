import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyAzEiz-_IZBznyAhR4Ztotvixa9LJ1NIP0",
  authDomain: "proveit-492e4.firebaseapp.com",
  projectId: "proveit-492e4",
  storageBucket: "proveit-492e4.appspot.com",
  messagingSenderId: "940720500143",
  appId: "1:940720500143:web:0eba22a9eecb4f003bd35a",
};

// Initialize Firebase

initializeApp(firebaseConfig);
let db: any;
let proofCol: any;
let proofs: Array<object> = [];

try {
  const db = getFirestore();
  const proofCol = collection(db, "proofs");
  // getDocs(proofCol)
  //   .then((snapshot) => {
  //     proofs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //   })
  //   .then((proofs) => {
  //     console.log(proofs);
  //   })

  //   .catch((err) => {
  //     console.log(err.message);
  //   });
} catch (err) {
  console.log(`error fetching the data: ${err}`);
}

// export async function GET() {
//   // your database logic
//   const db = getFirestore();
//   const proofCol = collection(db, "proofs");
//   let proofs: Array<object> = [];
//   getDocs(proofCol)
//     .then((snapshot) => {
//       snapshot.docs.forEach((doc) => {
//         proofs.push({ ...doc.data(), id: doc.id });
//         // console.log("herehrehr ");
//         // console.log(JSON.stringify(proofs));
//       });
//       return new Response(JSON.stringify({ proofs }), {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     })
//     // .then((proofs) => {
//     //   console.log(proofs);
//     //   return new Response(JSON.stringify({ proofs }), {
//     //     status: 200,
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //   });
//     // })

//     .catch((err) => {

//       console.log(`error converting data to json: ${err}`);
//     });
// }

export const GET = async () => {
  const db = getFirestore();
  const proofCol = collection(db, "proofs");
  const snapshot = await getDocs(proofCol);

  const proofs = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return new Response(JSON.stringify({ proofs }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
