"use server";

import { Community } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";

export const joinOrLeave = async (slug: string) => {
  const token = cookies().get("token");
  const { data } = await axios.put(
    `http://localhost:8000/api/community/${slug}/`,
    {},
    {
      headers: {
        Authorization: `Token ${token?.value}`,
      },
    },
  );

  return data;
};

export const getCommunityByName = async (slug: string) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/community/${slug}/`,
  );
  return data as Community;
};
