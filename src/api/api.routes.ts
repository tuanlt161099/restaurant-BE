import express from 'express';
import authRouter from './auth/auth.routes';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
export default apiRouter;
