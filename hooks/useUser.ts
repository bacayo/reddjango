import { getUser } from "@/actions/getUser";
import { Session } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useUser = (session: Session) => {
  const { data: user } = useQuery({
    queryKey: ["user", session && session.id],
    queryFn: () => getUser(session.id),
  });

  return {
    user,
  };
};
