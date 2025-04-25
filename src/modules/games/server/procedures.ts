import { DEFAULT_LIMIT } from "@/constants";
import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import z from "zod";
import { sortValues } from "../search-params";

export const gamesRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                cursor: z.number().default(1),
                limit: z.number().default(DEFAULT_LIMIT),
                category: z.string().nullable().optional(),
                minYear: z.string().nullable().optional(),
                maxYear: z.string().nullable().optional(),
                genres: z.array(z.string()).nullable().optional(),
                sort: z.enum(sortValues).nullable().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const where: Where = {}
            let sort: Sort = "name"

            if (input.sort === "default") {
                sort = "name"
            }
            if (input.sort === "newest") {
                sort = "+createdAt"
            }
            if (input.sort === "oldest") {
                sort = "-createdAt"
            }

            if (input.minYear && input.maxYear) {
                where.year = {
                    greater_than_equal: input.minYear,
                    less_than_equal: input.maxYear
                }
            } else if (input.minYear) {
                where.year = {
                    greater_than_equal: input.minYear
                }
            } else if (input.maxYear) {
                where.year = {
                    less_than_equal: input.maxYear
                }
            }

            if (input.category) {
                const categoriesData = await ctx.db.find({
                    collection: "categories",
                    depth: 1,
                    limit: 1,
                    pagination: false,
                    where: {
                        slug: {
                            equals: input.category,
                        }
                    }
                });

                const formattedData = categoriesData.docs.map((doc) => ({
                    ...doc,
                    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                        ...(doc as Category),
                        subcategories: undefined,
                    }))
                }));

                const subcategoriesIDs = []
                const parentCategory = formattedData[0];

                if (parentCategory) {
                    subcategoriesIDs.push(
                        ...parentCategory.subcategories.map((subcategory) => subcategory.id)
                    );

                    where["categories"] = {
                        in: [parentCategory.id, ...subcategoriesIDs]
                    }
                }
            }

            if (input.genres && input.genres.length > 0) {
                where["genres.name"] = {
                    in: input.genres,
                }
            }

            const data = await ctx.db.find({
                collection: "games",
                depth: 1,
                where,
                sort,
                page: input.cursor,
                limit: input.limit,
            });

            // Artificial delay for development/testing
            // await new Promise((resolve) => setTimeout(resolve, 3000));

            return {
                ...data,
                docs: data.docs.map((doc) => ({
                    ...doc,
                    image: doc.image as Media | null,
                }))
            }
        }),
});