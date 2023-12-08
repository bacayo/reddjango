import { Session } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";

export const getSession = async () => {
  const token = cookies().get("token");
  try {
    const res = await axios.get<Session>(
      "http://127.0.0.1:8000/auth/users/me/",
      {
        headers: {
          Authorization: `Token ${token?.value}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
