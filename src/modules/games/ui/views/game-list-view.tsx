import { Suspense } from "react"
import { GameFilters } from "../components/game-filters"
import { GameList, GameListSkeleton } from "../components/game-list"
import { GameSort } from "../components/game-sort"

interface Props {
  category?: string
}

export const GameListView = ({ category }: Props) => {
  return (
    <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row lg:items-center gpa-y-2 lg:gap-y-0 justify-between">
        <p className="text-2xl font-medium">Curated for you</p>
        <GameSort />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
        <div className="lg:col-span-2 xl:col-span-2">
          <GameFilters />
        </div>
        <div className="lg:col-span-4 xl:col-span-6">
          <Suspense fallback={<GameListSkeleton />}>
            <GameList category={category} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}