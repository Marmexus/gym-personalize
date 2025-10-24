import z from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1, { error: "Please enter your name" }),
    username: z.string().min(1, { error: "Please enter your username" }),
    email: z
      .email({ error: "Please enter valid email" })
      .min(1, { error: "Please enter email" }),
    password: z.string().min(1, { error: "Please enter password" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Please enter confirm password" }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password does not match",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export function validateSignUpSchema(data: SignUpSchema) {
  return signUpSchema.parse(data);
}
