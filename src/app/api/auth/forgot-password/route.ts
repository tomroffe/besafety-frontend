// app/api/auth/forgot-password/route.ts
export async function POST(req: Request) {
  const { email } = await req.json();
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/password-recovery/${email}`, { method: "POST" });
  return Response.json({ message: "sent" });
}

