"use server";

import { auth } from "@/auth";
import { ApiError } from "@/lib/api.utils";
import { validateSignInSchema } from "@/schemas/sign-in";
import { DEFAULT_ROOT_URL } from "@/types/constants";

export async function signIn(email: string, password: string) {
  try {
    // Validate input
    validateSignInSchema({ email, password });
    const response = await auth.api.signInEmail({
      body: { email, password, callbackURL: DEFAULT_ROOT_URL },
      asResponse: true,
    });

    if (!response.ok) {
      throw new ApiError("Invalid username or password", 400);
    }
    return { success: true, message: "OK", status: 200 };
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return { success: false, message: error.message, status: error.status };
    }
    return { success: false, message: "Unexpected error", status: 500 };
  }
}
