"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";

export const AuthButton = ({
  form,
}: {
  form: UseFormReturn<
    {
      username: string;
      password: string;
      email?: string;
    },
    any,
    undefined
  >;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      variant={form.formState.isValid ? "default" : "ghost"}
      type="submit"
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Please wait" : "Submit"}
    </Button>
  );
};
