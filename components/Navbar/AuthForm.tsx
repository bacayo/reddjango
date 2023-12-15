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
import { AuthButton } from "./AuthButton";
import { authFormSchema } from "@/lib/types";
import { SignUpAction } from "@/actions/signup-action";
import { toast, useToast } from "../ui/use-toast";
import { useAppDispatch } from "@/redux/hooks";
import { setModalOpen, setModalState } from "@/redux/slices/modalState";

const SignUpForm = () => {
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const dispatch = useAppDispatch();

  return (
    <Form {...form}>
      <form
        action={async (formdata: FormData) => {
          const res = await SignUpAction(formdata);
          if (res?.status === 201) {
            // setOpen(false);
            // setModalState("login");
            dispatch(setModalState("login"));
            toast({
              description: "you can login now",
              variant: "success",
            });
          }
          if (res?.error) {
            toast({
              title: Object.values(res.error).toString(),
              variant: "destructive",
            });
          }
          console.log(res?.error);
        }}
        className="flex w-full flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        {/* <SignupButton form={form} /> */}
        <AuthButton form={form} />
      </form>
    </Form>
  );
};

const LoginForm = () => {
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const dispatch = useAppDispatch();
  return (
    <Form {...form}>
      <form
        //   onSubmit={form.handleSubmit(onSubmit)}
        action={async (formdata: FormData) => {
          const res = await LoginAction(formdata);
          if (res?.status === 200) {
            // setOpen(false);
            dispatch(setModalOpen());
            toast({
              description: "You are now logged in.You will soon be redirected",
              variant: "success",
            });
          }
          if (res?.error) {
            toast({
              title: "Credentials invalid",
              variant: "destructive",
            });
          }
        }}
        className="flex w-full flex-col gap-5"
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
        <AuthButton form={form} />
      </form>
    </Form>
  );
};

export { LoginForm, SignUpForm };
