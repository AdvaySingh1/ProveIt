/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const res = await fetch("/proofs");
    if (res.ok) {
      const { proofs } = await res.json();
      //console.log(guides);
      return { props: { proofs } };
    } else {
      console.error("Error loading guides:", await res.text());
      throw new Error("Could not fetch the guides");
    }
  } catch (error) {
    console.error("Failed to load guides:", error);
    throw error;
  }
}
