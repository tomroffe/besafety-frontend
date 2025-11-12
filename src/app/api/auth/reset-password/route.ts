
// app/api/auth/reset-password/route.ts
export async function POST(req: Request) {
  const { token, new_password } = await req.json();
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reset-password`, {
    method: "POST",
    body: JSON.stringify({ token, new_password }),
  });
  return Response.json({ message: "Password reset" });
}
