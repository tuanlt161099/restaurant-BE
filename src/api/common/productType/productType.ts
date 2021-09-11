import express from 'express';
import STATUS_CODES from 'http-status';
import CONSTANTS from '../../../config/contants';
import errorHandler from '../../../config/errorHandler';
import DB from '../../../database/database.service';

const productTypeRouter = express.Router();

productTypeRouter.post('/', createProductType());
productTypeRouter.get('/', getListProductTypes());
export default productTypeRouter;
/** ================================================================================== */
/** functions */

function getListProductTypes() {
  const result = { ...CONSTANTS.RESULT, function: 'getListProductTypes' };
  return errorHandler(
    result,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const productTypeList = await DB.productType.findAll({
        attributes: ['id', 'name'],
        order: [['createDateTime', 'ASC']],
      });
      if (productTypeList.length > 0) {
        res
          .status(STATUS_CODES.OK)
          .send(productTypeList.map((productType) => productType.get({ plain: true })));
      } else res.status(STATUS_CODES.NO_CONTENT).send([]);
    },
  );
}

function createProductType() {
  const result = { ...CONSTANTS.RESULT, function: 'createUserType()' };
  return errorHandler(
    result,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const productTypeName = req.body.name as string;

      if (!productTypeName) {
        result.code = STATUS_CODES.PRECONDITION_FAILED;
        throw CONSTANTS.MESSAGES.HTTP.REQUIRED.PARAMS;
      }

      const productType = await DB.productType.findOne({
        attributes: ['id'],
        where: { name: productTypeName },
      });

      if (productType) {
        result.code = STATUS_CODES.CONFLICT;
        throw CONSTANTS.MESSAGES.HTTP.RESOURCE_EXISTED;
      }

      const newProductType = await DB.productType.create({ name: productTypeName });

      res.status(STATUS_CODES.OK).send(newProductType.get({ plain: true }));
    },
  );
}
