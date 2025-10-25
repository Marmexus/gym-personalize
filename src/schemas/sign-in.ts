import z from "zod";

export const signInSchema = z.object({
  email: z
    .email({ error: "Please enter valid email" })
    .min(1, { error: "Please enter email" }),
  password: z.string().min(1, { error: "Please enter password" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export function validateSignInSchema(data: SignInSchema) {
  return signInSchema.parse(data);
}
