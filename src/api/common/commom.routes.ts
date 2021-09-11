import express from 'express';
import productTypeRouter from './productType/productType';
import userTypeRoter from './userType/userTypes.routes';

const commonRouter = express.Router();

commonRouter.use('/user-types', userTypeRoter);
commonRouter.use('/product-types', productTypeRouter);
export default commonRouter;
