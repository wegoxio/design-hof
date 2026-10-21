import "server-only";

type QueryValue = string | number | boolean | undefined;

export class CataloguerRequestError extends Error {
  constructor(message: string, readonly status?: number, options?: ErrorOptions) {
    super(message, options);
    this.name = "CataloguerRequestError";
  }
}

function config() {
  const baseUrl = process.env.CATALOGUER_API_URL?.replace(/\/$/, "");
  const apiKey = process.env.CATALOGUER_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new CataloguerRequestError(
      "Falta configurar CATALOGUER_API_URL o CATALOGUER_API_KEY para el catálogo de DesignHof.",
    );
  }

  return { baseUrl, apiKey };
}

export async function cataloguerFetch<T>(path: string, query: Record<string, QueryValue> = {}): Promise<T> {
  const { baseUrl, apiKey } = config();
  const url = new URL(`${baseUrl}/public/${path.replace(/^\//, "")}`);
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  let response: Response;
  try {
    response = await fetch(url, {
      headers: { "X-Api-Key": apiKey, Accept: "application/json" },
      next: { revalidate: 300, tags: ["cataloguer"] },
    });
  } catch (error) {
    throw new CataloguerRequestError(`No se pudo conectar con Cataloguer al consultar ${path}.`, undefined, {
      cause: error,
    });
  }

  if (!response.ok) {
    const requestId = response.headers.get("x-request-id");
    throw new CataloguerRequestError(
      `Cataloguer respondió ${response.status} al consultar ${path}${requestId ? ` (request ${requestId})` : ""}.`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
