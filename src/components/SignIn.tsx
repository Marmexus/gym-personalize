"use client";

import { signIn } from "@/app/api/sign-in";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { signInSchema, SignInSchema } from "@/schemas/sign-in";
import { DEFAULT_ROOT_URL } from "@/types/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";

const SignIn = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInSchema) => {
    setIsSubmitting(true);
    // Reset before each submit
    setErrorMsg(null);

    const result = await signIn(data.email, data.password);

    if (!result.success) {
      setErrorMsg(result.message);
    } else {
      console.log("Signin Successfully!");
      // router.push(DEFAULT_ROOT_URL);
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          {isSubmitting ? (
            <Button type="submit" form="sign-in-form">
              <Spinner />
              Submit
            </Button>
          ) : (
            <Button type="submit" form="sign-in-form">
              Submit
            </Button>
          )}
        </Field>
        {errorMsg && (
          <p className="flex items-center justify-center text-red-400">
            {errorMsg}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default SignIn;
