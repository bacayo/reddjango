"use client";

import { getPost } from "@/actions/getPost";
import { updateVote } from "@/actions/post/post";
import { Post, Session } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks";
import { setModalOpen } from "@/redux/slices/modalState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Bookmark, Forward, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface PostProps {
  posts: Post;
  session: Session;
}

const Post = ({ posts, session }: PostProps) => {
  dayjs.extend(relativeTime);
  const dispatch = useAppDispatch();

  const { data } = useQuery({
    queryKey: ["posts", posts.id],
    queryFn: () => getPost(posts.id),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateVotes", posts.id],
    mutationFn: () => updateVote(posts.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <Link
      href={`r/${posts.community}/comments/${posts.title}`}
      className="flex max-h-[1024px] cursor-pointer flex-row  justify-center gap-2 rounded-lg border border-neutral-400 bg-neutral-100 hover:border-neutral-600 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-400 lg:max-w-2xl"
    >
      <section className="flex flex-1 flex-col gap-2  px-2 py-2">
        {/* posts nav */}
        <div className="flex items-center gap-2">
          {posts.community && (
            <Link
              href={{
                pathname: `/r/${posts.community}/`,
              }}
              className="cursor-pointer text-sm hover:underline"
            >
              r/{posts.community}
            </Link>
          )}
          <p className="text-sm text-muted-foreground">
            Posted by
            <span className="hover:underline"> u/{posts.author_name}</span>{" "}
            {dayjs().to(dayjs(posts.created_at))}
          </p>
        </div>
        {/* body title */}
        <div className="pt-4 ">
          <h3 className="text-2xl font-bold text-gray-200">{posts.title}</h3>
          <p className="pt-4 text-gray-300">{posts.content}</p>
        </div>
        {/* post footer */}
        <div className="flex items-center pt-4 text-sm text-muted-foreground">
          <Button
            onClick={() => (!session ? dispatch(setModalOpen()) : mutate())}
            variant="outline"
            size="sm"
            className="gap-1  border-none bg-neutral-100 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-600"
          >
            <Heart
              className={cn("h-5 w-5", {
                "animate-bounce fill-red-500 text-red-500 repeat-1":
                  data?.post.some((item) => item.user === session.id),
              })}
            />
            <span>{posts.votes}</span> likes
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-1  border-none bg-neutral-100 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-600"
          >
            <Link href={`r/${posts.community}/comments/${posts.title}`}>
              <MessageSquare className="h-5 w-5" />
              <span>{posts.comments.length}</span> comments
            </Link>
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
            <Bookmark className="h-5 w-5" />
            save
          </Button>
        </div>
      </section>
    </Link>
  );
};
export default Post;
