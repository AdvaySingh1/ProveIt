import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/database/fb-config";
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
  updateDoc,
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

export const DELETE = async ({ request, params }) => {
  const id = params.id;

  const proofDocRef = doc(db, "proofs", id);

  // Perform the deletion in the database
  await deleteDoc(proofDocRef);
  return new Response(
    JSON.stringify({ message: "Proof deleted successfully" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const PUT = async ({ request, params }) => {
  const id = params.id;
  const proof = await request.json();
  const proofDocRef = doc(db, "proofs", id);

  await updateDoc(proofDocRef, proof);

  return new Response(
    JSON.stringify({ message: "Proof updated successfully" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
