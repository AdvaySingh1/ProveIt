/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const res = await fetch("/guides");
    if (res.ok) {
      const { guides } = await res.json();
      //console.log(guides);
      return { props: { guides } };
    } else {
      console.error("Error loading guides:", await res.text());
      throw new Error("Could not fetch the guides");
    }
  } catch (error) {
    console.error("Failed to load guides:", error);
    throw error;
  }
}
