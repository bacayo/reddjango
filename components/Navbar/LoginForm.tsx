import { LoginAction } from "@/actions/login-action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import LoginButton from "./LoginButton";
import { loginFormSchema } from "@/lib/types";

interface LoginFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ setOpen }: LoginFormProps) => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        //   onSubmit={form.handleSubmit(onSubmit)}
        action={async (formdata: FormData) => {
          const res = await LoginAction(formdata);
          if (res?.status === 200) {
            setOpen(false);
          }
        }}
        className="flex flex-col gap-5 w-full"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoginButton form={form} />
      </form>
    </Form>
  );
};

export default LoginForm;
