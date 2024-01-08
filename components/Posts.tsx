"use client";

import { Session } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import React from "react";
import Post from "./Post";

interface PostsProps {
  //   posts: Post;
  session: Session;
}

const getPost = async () => {
  try {
    const { data } = await axios.get<Post[]>("http://localhost:8000/api/post/");
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.message);
    }
  }
};

const Posts = ({ session }: PostsProps) => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPost,
  });

  return (
    <>
      {posts?.map((post, index) => (
        <div
          className={cn("rounded-lg", {
            "mt-4": index !== 0,
          })}
          key={post.id}
        >
          <Post posts={post} session={session as Session} />
        </div>
      ))}
    </>
  );
};

export default Posts;
