"use client"

import { Button } from "@/components/ui/button";
import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { InboxIcon } from "lucide-react";
import { useGameFilters } from "../../hooks/use-game-filters";
import { GameCard, GameCardSkeleton } from "./game-card";

interface Props {
  category?: string;
}

export const GameList = ({ category }: Props) => {
  const [filters] = useGameFilters();

  const trpc = useTRPC();
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery(trpc.games.getMany.infiniteQueryOptions(
    {
      category,
      ...filters,
      limit: DEFAULT_LIMIT
    }, {
    getNextPageParam: (lastPage) => {
      return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
    }
  }
  ));

  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
        <InboxIcon />
        <p className="text-base font-medium">No games found</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.pages.flatMap((page) => page.docs).map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            name={game.name}
            imageUrl={game.image?.url}
            year={game.year}
            reviewRating={3}
            reviewCount={5}
          />
        ))}
      </div>
      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="font-medium disabled:opacity-50 text-base bg-white"
            variant="elevated"
          >
            Load more
          </Button>
        )}
      </div>
    </>
  );
};

export const GameListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <GameCardSkeleton key={index} />
      ))}
    </div>
  );
};