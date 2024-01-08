import { Post } from "@/lib/types";
import axios, { isAxiosError } from "axios";

export const getPost = async (id: number) => {
  try {
    const { data } = await axios.get<Post>(
      `http://localhost:8000/api/post/${id}/`,
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      // return error.message;
      console.log(error.message);
    }
  }
};
