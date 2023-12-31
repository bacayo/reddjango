import { getSession } from "@/actions/getSession";
import Container from "@/components/Container";
import CreateCommunityModal from "@/components/Modal/CreateCommunityModal";
import Posts from "@/components/Posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Session } from "@/lib/types";
import Banner from "@/public/images/banner.png";
import Image from "next/image";

export default async function Home() {
  const session = await getSession();

  return (
    <Container>
      <main className="flex w-full gap-2">
        {/* left */}
        <section className="flex  flex-1 flex-col">
          <div className="mb-4 rounded-lg bg-primary-foreground lg:max-w-2xl">
            <Input placeholder="create a post" />
          </div>
          <Posts session={session as Session} />
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
              <Button className="w-full rounded-xl font-extrabold dark:bg-amber-500 dark:hover:bg-amber-400">
                Create Post
              </Button>
              <CreateCommunityModal session={session as Session} />
            </div>
          </div>
        </section>
      </main>
    </Container>
  );
}
