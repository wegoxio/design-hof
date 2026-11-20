import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const logoPath = path.join(
    process.cwd(),
    "public",
    "shared",
    "brand",
    "designhof-logo.svg",
  );
  const logoSvg = await readFile(logoPath, "utf8");
  const embeddedPng = logoSvg.match(/data:image\/png;base64,([^"]+)/)?.[1];

  if (!embeddedPng) {
    return new Response("Design HOF logo unavailable", { status: 500 });
  }

  return new Response(new Uint8Array(Buffer.from(embeddedPng, "base64")), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
