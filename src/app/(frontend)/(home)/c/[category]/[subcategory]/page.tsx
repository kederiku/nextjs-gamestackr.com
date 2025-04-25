import { DEFAULT_LIMIT } from "@/constants";
import { loadGameFilters } from "@/modules/games/search-params";
import { GameListView } from "@/modules/games/ui/views/game-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";

interface Props {
  params: Promise<{
    subcategory: string;
  }>,
  searchParams: Promise<SearchParams>
}

const SubcategoryPage = async ({ params, searchParams }: Props) => {
  const { subcategory } = await params;
  const filters = await loadGameFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.games.getMany.infiniteQueryOptions({
    ...filters,
    category: subcategory,
    limit: DEFAULT_LIMIT
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GameListView category={subcategory} />
    </HydrationBoundary>
  );
};

export default SubcategoryPage;