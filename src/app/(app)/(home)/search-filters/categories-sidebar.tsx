import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { Manufacturer, Platform } from "@/payload-types";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: Manufacturer[];
}

export const CategoriesSidebar = ({
    open,
    onOpenChange,
    data
}: Props) => {

    const router = useRouter();

    // State to hold the currently displayed platforms (subcategories)
    const [displayedPlatforms, setDisplayedPlatforms] = useState<Platform[] | null>(null);
    // State to hold the selected manufacturer when viewing platforms
    const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>(null);

    const handleOpenChange = (open: boolean) => {
        // Reset state when closing the sidebar
        setSelectedManufacturer(null);
        setDisplayedPlatforms(null);
        onOpenChange(open);
    };

    const handleManufacturerClick = (manufacturer: Manufacturer) => {
        // Check if platforms exist and filter out non-object types (IDs)
        const platforms = manufacturer.platforms?.docs?.filter(
            (p): p is Platform => typeof p === 'object' && p !== null
        );

        if (platforms && platforms.length > 0) {
            // If platforms exist, show them as subcategories
            setDisplayedPlatforms(platforms);
            setSelectedManufacturer(manufacturer);
        } else {
            // This is a leaf manufacturer (no platforms) - navigate
            if (manufacturer.slug === "all") {
                router.push("/");
            } else {
                router.push(`/${manufacturer.slug}`);
            }
            handleOpenChange(false); // Close sidebar after navigation
        }
    }

    const handlePlatformClick = (platform: Platform) => {
        if (selectedManufacturer) {
            // Navigate to /manufacturer/platform
            router.push(`/${selectedManufacturer.slug}/${platform.slug}`);
            handleOpenChange(false); // Close sidebar after navigation
        }
    }

    const handleBackClick = () => {
        // Go back to the manufacturer list
        setDisplayedPlatforms(null);
        setSelectedManufacturer(null);
    }

    // Determine what to display
    const isDisplayingPlatforms = displayedPlatforms !== null && selectedManufacturer !== null;

    const backgroundColor = selectedManufacturer?.color || "white";

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent
                side="left"
                className="p-0 transition-none"
                style={{ backgroundColor }}
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        {/* Change title based on context */} 
                        {isDisplayingPlatforms ? selectedManufacturer.name : "Categories"}
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {/* Show back button only when displaying platforms */} 
                    {isDisplayingPlatforms && (
                        <button 
                            onClick={handleBackClick}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
                        >
                            <ChevronLeftIcon className="size-4 mr-2"/>
                            Back
                        </button>
                    )}
                    
                    {/* Render either manufacturers or platforms */} 
                    {!isDisplayingPlatforms 
                        ? data.map((manufacturer) => (
                            <button 
                                key={manufacturer.id}
                                onClick={() => handleManufacturerClick(manufacturer)}
                                className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
                            >
                                {manufacturer.name}
                                {/* Safely check for platforms before showing icon */}
                                {manufacturer.platforms?.docs && manufacturer.platforms.docs.length > 0 && (
                                    <ChevronRightIcon className="size-4" />
                                )}
                            </button>
                        ))
                        : displayedPlatforms.map((platform) => (
                            <button 
                                key={platform.id}
                                onClick={() => handlePlatformClick(platform)}
                                className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
                            >
                                {platform.name}
                                {/* Platforms don't have further subcategories in this logic */} 
                            </button>
                        ))
                    }
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};