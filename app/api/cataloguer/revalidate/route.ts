import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;

function sameSignature(received: string, expected: string) {
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.CATALOGUER_REVALIDATION_SECRET;
  if (!secret) return NextResponse.json({ error: "Revalidation is not configured" }, { status: 503 });

  const timestamp = request.headers.get("x-cataloguer-timestamp") ?? "";
  const received = request.headers.get("x-cataloguer-signature") ?? "";
  const timestampNumber = Number(timestamp);
  if (!Number.isSafeInteger(timestampNumber) || Math.abs(Date.now() - timestampNumber) > MAX_CLOCK_SKEW_MS) {
    return NextResponse.json({ error: "Invalid signature timestamp" }, { status: 401 });
  }

  const body = await request.text();
  const expected = `sha256=${createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex")}`;
  if (!sameSignature(received, expected)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  if (!payload || typeof payload !== "object" || (payload as { tag?: unknown }).tag !== "cataloguer" || (payload as { timestamp?: unknown }).timestamp !== timestamp) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  revalidateTag("cataloguer", { expire: 0 });
  return NextResponse.json({ revalidated: true });
}
