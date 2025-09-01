import { projectRouter  } from '@/modules/projects/server/procedures';
import {  createTRPCRouter } from '../init';
import { messagesRouter } from '@/modules/messages/server/procedures';
export const appRouter = createTRPCRouter({
  messages:messagesRouter,
  projects:projectRouter 
  // fragments:fragmentsRouter,
});

export type AppRouter = typeof appRouter;