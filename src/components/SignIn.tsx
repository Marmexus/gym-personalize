"use client";

import { signIn } from "@/app/api/sign-in";
import { signInSchema, SignInSchema } from "@/schemas/sign-in";
import { DEFAULT_ROOT_URL } from "@/types/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import FloatingLabelInput from "./ui/floating-label-input";
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
    console.log(result);

    if (!result.success) {
      setErrorMsg(result.message);
    } else {
      console.log("Signin Successfully!");
      router.push(DEFAULT_ROOT_URL);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-bold text-2xl">Welcome to Gym personalize!</h1>
        <p className="text-sm text-gray-400">
          Log your workout schedule and progress
        </p>
      </div>
      <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FloatingLabelInput
                  {...field}
                  id="email"
                  type="email"
                  label="Email"
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
                <FloatingLabelInput
                  {...field}
                  id="password"
                  type="password"
                  label="Password"
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
      <Field orientation="vertical">
        {isSubmitting ? (
          <Button
            type="submit"
            form="sign-in-form"
            className="w-full rounded-full"
          >
            <Spinner />
            Submit
          </Button>
        ) : (
          <Button
            type="submit"
            form="sign-in-form"
            disabled={isSubmitting}
            className="w-full rounded-full"
          >
            Submit
          </Button>
        )}
        {errorMsg && (
          <FieldLabel className="flex items-center justify-center text-red-400">
            {errorMsg}
          </FieldLabel>
        )}
      </Field>
    </div>
  );
};

export default SignIn;
