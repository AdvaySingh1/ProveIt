import type { RequestHandler } from "@sveltejs/kit";
import { proofsCol, people } from "$lib/database/fb-config";
import { addDoc, getDocs } from "firebase/firestore";

export const GET: RequestHandler = async ({ params }) => {
  const proofsSnapshot = await getDocs(proofsCol);

  const proofs = proofsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const peopleSnapshot = await getDocs(people);

  const ppl = peopleSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return new Response(JSON.stringify({ proofs, ppl }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// add new proofs

export const POST = async ({ request }) => {
  const newProof = await request.json();
  await addDoc(proofsCol, newProof);
  return new Response(JSON.stringify(newProof), {
    status: 201, // 201 Created
    headers: {
      "Content-Type": "application/json",
    },
  });
};
