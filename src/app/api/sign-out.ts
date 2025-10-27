"use server";

import { auth } from "@/auth";
import { APIError } from "better-auth";
import { headers } from "next/headers";

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        message: error.message,
        status: error.statusCode,
      };
    }
    return { success: false, message: "Unexpected error", status: 500 };
  }
}
