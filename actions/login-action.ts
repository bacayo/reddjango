"use server";
import { loginFormSchema } from "@/lib/types";
import axios, { isAxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = "http://127.0.0.1:8000/";

export async function LoginAction(formdata: FormData) {
  const values = loginFormSchema.parse({
    username: formdata.get("username"),
    password: formdata.get("password"),
  });
  const oneDay = 24 * 60 * 60 * 1000;

  try {
    const { data, status } = await axios.post(`${baseUrl}/auth/token/login`, {
      username: values.username,
      password: values.password,
    });

    if (status === 200) {
      cookies().set("token", data["auth_token"], {
        expires: Date.now() + oneDay,
      });
      revalidatePath("/");
      return { status: status, data: data };
    }
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
      return { error: error.response?.status };
    }
  }
}
