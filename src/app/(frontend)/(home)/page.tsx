"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.auth.session.queryOptions());

  return (
    <div>
      HOME
      <p className="font-medium p-10">{JSON.stringify(data?.user, null, 2)}</p>
    </div>
  );
}
