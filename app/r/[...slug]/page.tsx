import { getSession } from "@/actions/getSession";
import Container from "@/components/Container";
import { Session } from "@/lib/types";
import CommunityDetail from "./CommunityDetail";
import CommunityNavbar from "./components/CommunityNavbar";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
  params: {
    slug: string;
  };
}

export default async function Page({ searchParams, params }: Props) {
  const session = await getSession();
  return (
    <>
      <nav className="bg-neutral-100 dark:bg-neutral-800">
        <Container>
          <CommunityNavbar slug={params.slug[0]} session={session as Session} />
        </Container>
      </nav>
      <Container>
        <div className="w-full pt-4">
          <CommunityDetail params={params} session={session as Session} />
        </div>
      </Container>
    </>
  );
}
