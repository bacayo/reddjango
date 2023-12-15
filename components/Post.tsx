"use client";

import { Post, Session } from "@/lib/types";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Forward,
  Heart,
  MessageSquare,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { setModalOpen } from "@/redux/slices/modalState";
import { useTheme } from "next-themes";

interface PostProps {
  posts: Post;
  session: Session;
}

const Post = ({ posts, session }: PostProps) => {
  dayjs.extend(relativeTime);
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-full cursor-pointer items-start gap-2 rounded-lg border border-neutral-400 bg-neutral-100 hover:border-neutral-600 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-400 lg:max-w-2xl">
      {/* left */}
      <div className="flex h-full flex-col items-center justify-start gap-2 rounded-l-lg bg-neutral-50 px-1 py-2 dark:bg-neutral-950 dark:text-neutral-400">
        <ArrowUpCircle
          className="cursor-pointer hover:text-emerald-700 "
          onClick={() => {
            !session && dispatch(setModalOpen());
          }}
        />
        <p>{posts.votes}</p>
        <ArrowDownCircle
          className="cursor-pointer hover:text-blue-400"
          onClick={() => {
            !session && dispatch(setModalOpen());
          }}
        />
      </div>
      {/* right */}
      <section className="flex-1 px-2 py-2">
        {/* posts nav */}
        <div className="flex items-center gap-2">
          <h4 className="cursor-pointer text-sm">r/{posts.community}</h4>
          <p className="text-sm text-muted-foreground">
            Posted by u/
            <span className="cursor-pointer">{posts.author_name}</span>{" "}
            {dayjs().to(dayjs(posts.created_at))}
          </p>
        </div>
        {/* body title */}
        <div className="pt-4 ">
          <h3>{posts.title}</h3>
          <p className="pt-4">{posts.content}</p>
        </div>
        {/* post footer */}
        <div className="flex items-center pt-4 text-sm text-muted-foreground">
          <Button
            variant="outline"
            size="sm"
            className="gap-1  border-none bg-neutral-100 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-600"
          >
            <MessageSquare className="h-5 w-5" />
            {/* <span>{posts.comments.length}</span> comments */}
            <span>{posts.comments.length}</span> comments
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1 border-none bg-neutral-100 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-600"
          >
            <Forward className="h-5 w-5" />
            share
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1 border-none bg-neutral-100 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-600"
          >
            <Heart className="h-5 w-5" />
            save
          </Button>
        </div>
      </section>
    </div>
  );
};
export default Post;
