import { Checkbox } from "@/components/ui/checkbox";
import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

interface GenresFilterProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

export const GenresFilter = ({
  value,
  onChange
}: GenresFilterProps) => {

  const trpc = useTRPC();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(trpc.genres.getMany.infiniteQueryOptions(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
      }
    }
  ));

  const onClick = (genre: string) => {
    if (value?.includes(genre)) {
      onChange(value?.filter((g) => g !== genre) || [])
    } else {
      onChange([...(value || []), genre]);
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <LoaderIcon className="size-4 animate-spin" />
        </div>
      ) : (
        data?.pages.map((page) =>
          page.docs.map((genre) => (
            <div
              key={genre.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onClick(genre.name)}
            >
              <p className="font-medium">{genre.name}</p>
              <Checkbox
                checked={value?.includes(genre.name)}
                onCheckedChange={() => onClick(genre.name)}
              />
            </div>
          ))
        )
      )}
      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="underline font-medium justify-start text-start disabled:opacity-50 cursor-pointer"
        >
          Load more...
        </button>
      )}
    </div>
  );
}