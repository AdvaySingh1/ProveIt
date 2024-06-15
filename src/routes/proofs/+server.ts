import type { RequestHandler } from "@sveltejs/kit";
import db from "$lib/database/fb-config";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import type { RequestEvent } from "./$types";

const proofCol = collection(db, "proofs");

export const GET: RequestHandler = async ({ params }) => {
  //const db = getFirestore();
  console.log({ params });

  //define query

  const q = query(
    proofCol,
    where("Author", "!=", "patrick rothfuss"),
    orderBy("Subject")
  );

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
export const POST = async ({ request }) => {
  const newProof = await request.json();
  await addDoc(proofCol, newProof);
  return new Response(JSON.stringify(newProof), {
    status: 201, // 201 Created
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// export const post: RequestHandler<Locals, Data> = async ({
//   addDoc(proofCol, {
//     Author: 'addBookForm.title.value',
//     Subject: 'addBookForm.author.value',
//     created: serverTimestamp(),
//   });
// };

// export const PUT: RequestHandler = async ({ request }) => {
//   // Your code to handle PUT request
// };

// export const DELETE: RequestHandler = async ({ request }) => {
//   // Your code to handle DELETE request
// };
