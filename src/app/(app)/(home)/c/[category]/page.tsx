import { loadGameFilters } from "@/modules/games/search-params";
import { GameListView } from "@/modules/games/ui/views/game-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";

interface Props {
  params: Promise<{
    category: string;
  }>,
  searchParams: Promise<SearchParams>
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const filters = await loadGameFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.games.getMany.queryOptions({
    category,
    ...filters
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GameListView category={category} />
    </HydrationBoundary>
  );
};

export default CategoryPage;