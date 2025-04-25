import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  id: number;
  name: string;
  imageUrl?: string | null;
  year?: number | null | undefined;
  reviewRating: number;
  reviewCount: number;
}

export const GameCard = ({
  id,
  name,
  imageUrl,
  year,
  reviewCount,
  reviewRating,
}: GameCardProps) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col">
        <div className="relative aspect-3/4">
          <Image
            alt={name}
            fill
            src={imageUrl || "/images/assets/placeholder.png"}
            className="object-cover"
          />
        </div>
        <div className="p-4 border-y flex flex-col gap-3 flex-1">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          <p className="text-sm font-base line-clamp-4">{year}</p>
          <div className="flex items-center gap-2">
            {imageUrl && (
              <Image
                alt={name}
                src={imageUrl || "/images/assets/placeholder.png"}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm underline font-medium">Kedeiku</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 fill-black" />
              {reviewRating} ({reviewCount})
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="relative px-2 py-1 border bg-pink-400 w-fit">
            <p className="text-sm font-medium">{year}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const GameCardSkeleton = () => {
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse" />
  );
}