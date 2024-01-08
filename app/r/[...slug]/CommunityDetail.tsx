"use client";

import Post from "@/components/Post";
import { Community, Session } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./loading";
// import Loading from "./loading";

const getPost = async (name: string) => {
  const { data } = await axios.get<Community>(
    `http://localhost:8000/api/community/${name}/`,
  );
  return data;
};

interface CommunityDetailProps {
  params: { slug: string };
  session: Session;
}

const CommunityDetail = ({ params, session }: CommunityDetailProps) => {
  const { slug } = params;
  const { data: community, isLoading } = useQuery({
    queryKey: ["posts", slug[0]],
    queryFn: () => getPost(slug[0]),
  });

  return (
    <>
      {community?.posts.map((post, index) => (
        <div key={index}>
          <Post posts={post} session={session as Session} />
        </div>
      ))}
    </>
  );
};

export default CommunityDetail;
