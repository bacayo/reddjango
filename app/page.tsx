import Post from "@/components/Post";
import axios from "axios";
import React from "react";
import { cn } from "@/lib/utils";
import { getSession } from "@/actions/getSession";
import { Session } from "@/lib/types";

const getPost = async () => {
  const { data, status, statusText } = await axios.get<Post[]>(
    "http://127.0.0.1:8000/api/post/"
  );
  return { data, status, statusText };
};

export default async function Home() {
  const { data: posts, status, statusText } = await getPost();
  const session = await getSession();

  return (
    // <div className="bg-red-500 h-screen px-10 md:px-20 mx-auto lg:max-w-[50%]">
    // <div className="mx-auto lg:max-w-5xl px-6 py-5 bg-red-400">
    <div className="flex flex-col flex-grow">
      {posts.map((post, index) => (
        <div className={cn({ "mt-4": index !== 0 })} key={post.id}>
          <Post posts={post} session={session as Session} />
        </div>
      ))}
    </div>
  );
}
