import { createAuthClient } from "better-auth/react";

export class ApiError extends Error {
  constructor(public message: string, public status: number = 400) {
    super(message);
  }
}

export function jsonResponse<T extends Record<string, unknown>>(
  data: T,
  status = 200
) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const authClient = createAuthClient();
