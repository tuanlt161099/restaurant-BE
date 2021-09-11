import express from 'express';
import authRouter, { verifyToken } from './auth/auth.routes';
import commonRouter from './common/commom.routes';
import productScreenRouter from './screens/product/screen.routes';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/common', verifyToken(), commonRouter);
apiRouter.use('/product-screen', verifyToken(), productScreenRouter);
export default apiRouter;
