import { z } from "zod";

export const authFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 2 characters." })
    .max(20),
  email: z.string().email().optional(),
});

export type Session = {
  email: string;
  id: number;
  username: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  community: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  comments: Comment[];
  votes: number;
};

export type Comment = {
  author_name: string;
  comment_body: string;
  parent_comment: number;
  created_at: string;
  updated_at: string;
  post: number;
  parent_comments: Comment[];
};
