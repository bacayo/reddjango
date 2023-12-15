import Post from "@/components/Post";
import axios from "axios";
import React from "react";
import { cn } from "@/lib/utils";
import { getSession } from "@/actions/getSession";
import { Session } from "@/lib/types";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Banner from "@/public/images/banner.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const getPost = async () => {
  const { data, status, statusText } = await axios.get<Post[]>(
    "http://127.0.0.1:8000/api/post/",
  );
  return { data, status, statusText };
};

export default async function Home() {
  const { data: posts, status, statusText } = await getPost();
  const session = await getSession();

  return (
    <main className="flex w-full gap-2">
      {/* left */}
      <section className="flex  flex-1 flex-col">
        <div className="mb-4 rounded-lg bg-primary-foreground lg:max-w-2xl">
          <Input placeholder="create a post" />
        </div>
        {posts.map((post, index) => (
          <div
            className={cn("rounded-lg", {
              "mt-4": index !== 0,
            })}
            key={post.id}
          >
            <Post posts={post} session={session as Session} />
          </div>
        ))}
      </section>
      {/* right */}
      <section className="hidden w-1/3 items-start gap-2 rounded-lg border border-neutral-400 bg-neutral-100 hover:border-neutral-600 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-400 lg:flex ">
        <div className="flex flex-col gap-2">
          <Image src={Banner} alt="banner" height={34} className="w-full" />
          <div className="flex flex-col gap-4 px-2 py-2">
            <h2>Home</h2>
            <p>
              Your personal Reddit frontpage. Come here to check in with your
              favorite communities.
            </p>
            <Separator className="mt-4 bg-neutral-600 dark:bg-neutral-500" />
            <Button className="w-full font-extrabold dark:bg-amber-500 dark:hover:bg-amber-400">
              Create Post
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
