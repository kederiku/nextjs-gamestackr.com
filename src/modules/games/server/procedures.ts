import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import z from "zod";

export const gamesRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                category: z.string().nullable().optional(),
                minYear: z.string().nullable().optional(),
                maxYear: z.string().nullable().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const where: Where = {}

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
            const data = await ctx.db.find({
                collection: "games",
                depth: 1,
                sort: "name",
                where
            });

            // Artificial delay for development/testing
            // await new Promise((resolve) => setTimeout(resolve, 3000));

            return data
        }),
});