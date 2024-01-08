import { Session, User } from "@/lib/types";
import axios, { isAxiosError } from "axios";

export const getUser = async (id: number) => {
  try {
    const res = await axios.get<User>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}/`,
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.message);
    }
  }
};
