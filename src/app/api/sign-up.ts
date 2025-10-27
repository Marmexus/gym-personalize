"use server";

import { auth } from "@/auth";
import { findUserByField } from "@/db/queries/user";
import { ApiError } from "@/lib/api.utils";
import { SignUpSchema, validateSignUpSchema } from "@/schemas";
import { APIError } from "better-auth";

export async function signUp(data: SignUpSchema) {
  try {
    // Validate input
    validateSignUpSchema(data);

    // Check duplicate username
    const [existingUsername, existingEmail] = await Promise.all([
      findUserByField("username", data.username),
      findUserByField("email", data.email),
    ]);

    if (existingUsername) {
      throw new ApiError("This username is already existed", 409);
    }
    if (existingEmail) {
      throw new ApiError("This email is already existed", 409);
    }

    const response = await auth.api.signUpEmail({
      body: { ...data, callbackURL: "/sign-in" },
      asResponse: true,
    });
    console.log(response);

    return { success: true, message: "OK", status: 201 };
  } catch (error) {
    console.log(error);
    // if (error instanceof ApiError) {
    //   return { success: false, message: error.message, status: error.status };
    // }

    if (error instanceof APIError) {
      console.log(error.message, error.status);
    }

    return {
      success: false,
      message: "Unexpected error",
      status: 500,
    };
  }
}
