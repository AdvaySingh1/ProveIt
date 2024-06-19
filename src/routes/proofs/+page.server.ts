/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const res = await fetch("/proofs");
    if (res.ok) {
      const { proofs, ppl } = await res.json();
      return { props: { proofs, ppl } };
    } else {
      console.error("Error loading guides:", await res.text());
      throw new Error("Could not fetch the guides");
    }
  } catch (error) {
    console.error("Failed to load guides:", error);
    throw error;
  }
}
