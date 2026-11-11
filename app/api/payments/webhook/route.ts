import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function validSignature(payload: string, header: string, secret: string) {
  const parts = header.split(",").map((part) => part.split("=", 2));
  const timestamp = parts.find(([key]) => key === "t")?.[1];
  const signatures = parts.filter(([key]) => key === "v1").map(([, value]) => value);
  if (!timestamp || !signatures.length || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  return signatures.some((signature) => {
    const actualBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expected, "hex");
    return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
  });
}

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  const payload = await request.text();
  if (!secret || !signature || !validSignature(payload, signature, secret)) {
    return NextResponse.json({ error: "Firma de webhook inválida." }, { status: 400 });
  }

  const event = JSON.parse(payload) as { id?: string; type?: string; data?: { object?: { id?: string; payment_status?: string } } };
  if (["checkout.session.completed", "checkout.session.async_payment_succeeded", "checkout.session.async_payment_failed"].includes(event.type ?? "")) {
    console.info("Stripe Checkout event", {
      eventId: event.id,
      type: event.type,
      sessionId: event.data?.object?.id,
      paymentStatus: event.data?.object?.payment_status,
    });
  }
  return NextResponse.json({ received: true });
}
