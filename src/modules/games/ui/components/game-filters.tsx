"use client";

import { cn } from "@/lib/utils";
import { useGameFilters } from "@/modules/games/hooks/use-game-filters";
import { GenresFilter } from "@/modules/games/ui/components/genres-filter";
import { YearFilter } from "@/modules/games/ui/components/year-filter";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

interface GameFilterProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const GameFilter = ({
  title,
  className,
  children,
}: GameFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn(
      "p-4 border-b flex flex-col gap-2",
      className
    )}>
      <div
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center justify-between cursor-pointer"
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" />
      </div>
      {isOpen && children}
    </div>
  );
};

export const GameFilters = () => {
  const [filters, setFilters] = useGameFilters();

  const hasAnyFilters = Object.entries(filters).some(([key, value]) => {
    if (key === "sort") return false

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    if (typeof value === "string") {
      return value !== "";
    }
    return value !== null;
  })

  const onClear = () => {
    setFilters({
      minYear: "",
      maxYear: "",
      genres: [],
    });
  };

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Filters</p>
        {hasAnyFilters && (
          <button className="underline cursor-pointer" onClick={() => onClear()} type="button">
            Clear
          </button>
        )}

      </div>
      <GameFilter title="Year">
        <YearFilter
          minYear={filters.minYear}
          maxYear={filters.maxYear}
          onMinYearChange={(value) => onChange("minYear", value)}
          onMaxYearChange={(value) => onChange("maxYear", value)}
        />
      </GameFilter>
      <GameFilter title="Genres" className="border-b-0">
        <GenresFilter
          value={filters.genres}
          onChange={(value) => onChange("genres", value)}
        />
      </GameFilter>
    </div>
  )
}