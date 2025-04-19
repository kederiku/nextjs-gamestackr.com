import { Manufacturer } from "@/payload-types";

import { CategoryDropdown } from "./category-dropdown";

interface Props {
    data: Manufacturer[]
};

export const Categories = ({
    data,
}: Props) => {
    return (
        <div className="relative w-full">
            <div className="flex flex-nowrap items-center">
                {data.map((manufacturer: Manufacturer) => (
                    <div key={manufacturer.id}>
                        <CategoryDropdown 
                            category={manufacturer}
                            isActive={false}
                            isNavigationHovered={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};