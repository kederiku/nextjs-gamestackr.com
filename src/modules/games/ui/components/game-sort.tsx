"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGameFilters } from "../../hooks/use-game-filters";

export const GameSort = () => {
  const [filters, setFilters] = useGameFilters();
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "default" &&
          "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: 'default' })}
      >
        Default
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "oldest" &&
          "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: 'oldest' })}
      >
        Oldest
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "newest" &&
          "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: 'newest' })}
      >
        Newest
      </Button>

    </div>
  )
}