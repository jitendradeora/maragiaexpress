import { contentRevalidate, env } from "@/lib/env"

type GraphQlError = { message?: string }
type GraphQlResponse<T> = { data?: T; errors?: GraphQlError[] }

export async function wpQuery<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  let response: Response
  try {
    response = await fetch(env.wpGraphqlUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: contentRevalidate },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "errore di rete"
    throw new Error(`WPGraphQL non raggiungibile: ${message}`)
  }

  if (!response.ok) {
    throw new Error(`WPGraphQL ha risposto con stato ${response.status}`)
  }

  const payload = (await response.json()) as GraphQlResponse<T>
  if (payload.errors?.length) {
    const message = payload.errors
      .map((error) => error.message)
      .filter(Boolean)
      .join("; ")
    throw new Error(`WPGraphQL: ${message || "richiesta non valida"}`)
  }
  if (!payload.data) {
    throw new Error("WPGraphQL non ha restituito dati")
  }
  return payload.data
}
