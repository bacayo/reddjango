import { Session } from "@/lib/types";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";

export const getSession = async () => {
  const token = cookies().get("token");
  try {
    const res = await axios.get<Session>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/me/`,
      {
        headers: {
          Authorization: `Token ${token?.value}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
};
