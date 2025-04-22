"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGameFilters } from "../../hooks/use-game-filters";

interface Props {
  category?: string;
}

export const GameList = ({ category }: Props) => {
  const [filters] = useGameFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.games.getMany.queryOptions({
    category,
    ...filters,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {data?.docs.map((game) => (
        <div key={game.id} className="border rounded-md bg-white p-4">
          <h2 className="text-xl font-medium">{game.name}</h2>
          <p>{game.year || ""}</p>
        </div>
      ))}
    </div>
  );
};

export const GameListSkeleton = () => {
  return (
    <div>
      Loading..
    </div>
  );
};