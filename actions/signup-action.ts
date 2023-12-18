"use server";

import { authFormSchema } from "@/lib/types";
import axios, { isAxiosError } from "axios";

export async function SignUpAction(formdata: FormData) {
  const values = authFormSchema.parse({
    username: formdata.get("username"),
    password: formdata.get("password"),
    email: formdata.get("email"),
  });

  try {
    const { data, status, statusText } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users`,
      {
        username: values.username,
        password: values.password,
        email: values.email,
      },
    );
    return {
      data: data,
      status: status,
      statusText: statusText,
    };
  } catch (error) {
    console.log(error);
    if (isAxiosError(error)) {
      return { error: error.response?.data };
    }
  }
}
