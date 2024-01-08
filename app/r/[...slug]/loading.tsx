import Container from "@/components/Container";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <Container>
      <div className="mx-auto flex w-4/6 flex-col gap-2">
        <div className="mx-auto flex w-full flex-col gap-2 rounded-lg py-2  dark:bg-neutral-900">
          <Skeleton className="h-6 w-2/4" />
          <Skeleton className="h-60 w-full " />
          <Skeleton className="h-6 w-2/4" />
        </div>
        <div className="mx-auto flex w-full flex-col gap-2 rounded-lg py-2  dark:bg-neutral-900">
          <Skeleton className="h-6 w-2/4" />
          <Skeleton className="h-60 w-full " />
          <Skeleton className="h-6 w-2/4" />
        </div>
      </div>
    </Container>
  );
};

export default loading;
