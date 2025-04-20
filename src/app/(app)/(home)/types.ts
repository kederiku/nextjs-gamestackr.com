import { Manufacturer, Platform } from "@/payload-types";

export type CustomCategory = Manufacturer & {
    plaforms: Platform[],
};