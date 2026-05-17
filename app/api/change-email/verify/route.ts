import { NextResponse } from "next/server";
import { executeEmailChangeVerification } from "@/features/auth/lib/verify-email-change";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request" },
      { status: 400 },
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("token" in body) ||
    typeof (body as { token: unknown }).token !== "string"
  ) {
    return NextResponse.json(
      { ok: false, message: "Invalid request" },
      { status: 400 },
    );
  }

  const token = (body as { token: string }).token;
  const result = await executeEmailChangeVerification(token);

  if (result.ok) {
    return NextResponse.json({ ok: true as const });
  }

  return NextResponse.json(
    { ok: false as const, message: result.message },
    { status: 400 },
  );
}
