import { createUser, findUserByField } from "@/db/queries/user";
import { ApiError, jsonResponse } from "@/lib/api.utils";
import { hashing } from "@/lib/server-side.utils";
import { validateSignUpSchema } from "@/schemas";
import z from "zod";

export async function POST(request: Request) {
  try {
    // Server side validate body
    const { confirmPassword, password, ...data } = validateSignUpSchema(
      await request.json()
    );

    const hashed = await hashing(password);

    const [existingUsername, existingEmail] = await Promise.all([
      findUserByField("username", data.username),
      findUserByField("email", data.email),
    ]);

    if (existingUsername) {
      throw new ApiError("Duplicate username", 409);
    }

    if (existingEmail) {
      throw new ApiError("Duplicate email", 409);
    }

    // Save user
    await createUser({ ...data, password: hashed });

    return jsonResponse({ message: "OK" }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse({ message: "Invalid input" }, 400);
    }
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, error.status);
    }
    return jsonResponse({ message: "Unexpected error" }, 500);
  }
}
