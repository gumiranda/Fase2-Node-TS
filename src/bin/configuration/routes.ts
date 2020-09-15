import { Express } from 'express';
import userRouter from '@/modules/user/routes/user-router';

export default async (app: Express): Promise<void> => {
  app.use('/api/user', userRouter);
};
