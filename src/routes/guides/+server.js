// import db
export async function GET() {
  // your database logic

  const guides = [
    { id: 1, title: "some title" },
    { id: 2, title: "some title 2" },
    { id: 3, title: "some title 3" },
    { id: 4, title: "big title" },
    { id: 5, title: "some title 5" },
  ];
  return new Response(JSON.stringify({ guides }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// // other handlers
// export async function post() {}
// export async function del() {}
