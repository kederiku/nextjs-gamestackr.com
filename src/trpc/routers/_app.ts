import { authRouter } from '@/modules/auth/server/procedures';
import { categoriesRouter } from '@/modules/categories/server/procedures';
import { gamesRouter } from '@/modules/games/server/procedures';
import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  games: gamesRouter,
  categories: categoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;