"use client";

import { getCommunityByName, joinOrLeave } from "@/actions/community/community";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { Session } from "@/lib/types";
import { useAppDispatch } from "@/redux/hooks";
import { setModalOpen } from "@/redux/slices/modalState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

const CommunityNavbar = ({
  slug,
  session,
}: {
  slug: string;
  session: Session;
}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { user } = useUser(session);

  const { data: community } = useQuery({
    queryKey: ["community", slug],
    queryFn: () => getCommunityByName(slug),
  });

  const mutation = useMutation({
    mutationKey: ["join", slug],
    mutationFn: () => joinOrLeave(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community"],
      });
    },
  });

  return (
    <>
      <div className="flex w-full flex-row items-center gap-4 ">
        <Image
          src={"/images/communityDefaultLogo.svg"}
          alt="logo"
          width={64}
          height={64}
        />
        <div>
          <p className="text-3xl">{slug}</p>
          <p>r/{slug}</p>
        </div>
        {session ? (
          <Button
            onClick={() => mutation.mutate()}
            className="rounded-3xl px-8 font-bold tracking-wider"
            size="default"
          >
            {community?.members.includes(user?.id as number)
              ? "Joined"
              : "Join"}
          </Button>
        ) : (
          <Button
            onClick={() => {
              dispatch(setModalOpen());
            }}
            className="rounded-3xl px-8 font-bold tracking-wider dark:bg-purple-400 dark:hover:bg-purple-300"
            size="default"
          >
            Join
          </Button>
        )}
      </div>
    </>
  );
};

export default CommunityNavbar;
