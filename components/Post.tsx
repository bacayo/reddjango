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

interface PostProps {
  posts: Post;
  session: Session;
}

const Post = ({ posts, session }: PostProps) => {
  dayjs.extend(relativeTime);

  const dispatch = useAppDispatch();

  return (
    <div className="dark:bg-neutral-900 flex items-start gap-2 lg:max-w-2xl cursor-pointer h-full border-neutral-400 hover:border-neutral-600 dark:border-neutral-600 border rounded dark:hover:border-neutral-400">
      {/* left */}
      <div className="flex flex-col items-center justify-start gap-2 px-1 py-2 h-full dark:bg-neutral-950 bg-neutral-100 dark:text-neutral-400">
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
          <h4 className="text-sm cursor-pointer">r/{posts.community}</h4>
          <p className="text-muted-foreground text-sm">
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
        <div className="pt-4 flex items-center text-sm text-muted-foreground">
          <Button
            variant="outline"
            size="sm"
            className="dark:bg-neutral-900  border-none dark:hover:bg-neutral-600 gap-1"
          >
            <MessageSquare className="h-5 w-5" />
            {/* <span>{posts.comments.length}</span> comments */}
            <span>{posts.comments.length}</span> comments
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="dark:bg-neutral-900 border-none dark:hover:bg-neutral-600 gap-1"
          >
            <Forward className="h-5 w-5" />
            share
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="dark:bg-neutral-900 border-none dark:hover:bg-neutral-600 gap-1"
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
