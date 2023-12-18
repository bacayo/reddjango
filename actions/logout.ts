"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const logout = async () => {
  const token = cookies().get("token");

  try {
    const { data, status, statusText } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/token/logout`,
      {},
      {
        headers: {
          Authorization: `Token ${token?.value}`,
        },
      },
    );
    if (status === 204) {
      cookies().delete("token");
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
