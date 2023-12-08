import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 2 characters." })
    .max(20),
});

export type Session = {
  email: string;
  id: number;
  username: string;
};
