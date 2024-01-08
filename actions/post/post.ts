"use server";

import { Post } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";

export const updateVote = async (id: number) => {
  const token = cookies().get("token")?.value;

  const { data } = await axios.put<Post>(
    `http://127.0.0.1:8000/api/post/${id}/`,
    {},
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return data;
};
