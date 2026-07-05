import bcrypt from "bcryptjs";

export async function GET(req: Request, { params }: { params: Promise<{ p: string }> }) {
  const { p } = await params;
  const password_hash = await bcrypt.hash(p, 10);
  return Response.json({hash: password_hash});
}