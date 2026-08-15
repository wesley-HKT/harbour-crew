export async function POST(req: Request) {
  const body = await req.json();
  console.log("harbour-crew inquiry", {
    company: body.company,
    industry: body.industry,
    name: body.name,
    createdAt: body.createdAt,
  });
  return Response.json({ ok: true });
}
