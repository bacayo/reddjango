"use server";

import { authFormSchema } from "@/lib/types";
import axios from "axios";

export async function SignUpAction(formdata: FormData) {
  const values = authFormSchema.parse({
    username: formdata.get("username"),
    password: formdata.get("password"),
    email: formdata.get("email"),
  });

  try {
    const { data, status } = await axios.post(
      "http://127.0.0.1:8000/auth/users/",
      {
        username: values.username,
        password: values.password,
        email: values.email,
      }
    );
    return {
      data: data,
      status: status,
    };
  } catch (error) {
    console.log(error);
  }
}
