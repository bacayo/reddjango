"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const logout = async () => {
  const token = cookies().get("token");

  try {
    const { data, status, statusText } = await axios.post(
      "http://127.0.0.1:8000/auth/token/logout",
      {},
      {
        headers: {
          Authorization: `Token ${token?.value}`,
        },
      }
    );
    if (status === 204) {
      cookies().delete("token");
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
