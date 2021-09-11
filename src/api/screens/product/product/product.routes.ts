import express, { NextFunction } from 'express';
import STATUS_CODES from 'http-status';
import CONSTANTS from '../../../../config/contants';
import errorHandler from '../../../../config/errorHandler';
import DB from '../../../../database/database.service';
import jsonwebtoken from 'jsonwebtoken';

const productScreenRouter = express.Router();

productScreenRouter.post('/', createProduct());
productScreenRouter.get('/', getListProduct());
export default productScreenRouter;
/** ================================================================================== */
/**
function
*/

function getListProduct() {
  const result = { ...CONSTANTS.RESULT, function: 'getListProduct()' };
  return errorHandler(
    result,
    async (req: express.Request, res: express.Response, next: NextFunction) => {
      const productList = await DB.product.findAll({
        attributes: ['id', 'name', 'price', 'unit'],
        include: [{ model: DB.productType, as: 'productType', attributes: ['id', 'name'] }],
        order: [['editDateTime', 'DESC']],
      });

      if (productList.length > 0) {
        res.status(STATUS_CODES.OK).send(productList);
      } else res.status(STATUS_CODES.NO_CONTENT).send([]);
    },
  );
}

function createProduct() {
  const result = { ...CONSTANTS.RESULT, function: 'createProduct()' };
  return errorHandler(result, async (req: express.Request, res: express.Response) => {
    const token = req.headers.token as string;
    const userInfo = jsonwebtoken.decode(token);
    const loginUserId = (userInfo as jsonwebtoken.JwtPayload)?.id;

    const productTypeName = req.body.productTypeName;
    const name = req.body.name;
    const price = req.body.price;
    const unit = req.body.unit;

    if (!productTypeName || !name || !price || !unit || !loginUserId) {
      result.code = STATUS_CODES.PRECONDITION_FAILED;
      throw CONSTANTS.MESSAGES.HTTP.REQUIRED.PARAMS;
    }

    /** check if product is existed */
    const product = await DB.product.findOne({
      attributes: ['id'],
      where: { name: name },
    });

    if (product) {
      result.code = STATUS_CODES.CONFLICT;
      throw CONSTANTS.MESSAGES.HTTP.RESOURCE_EXISTED;
    }

    /** get product type id */
    const productType = await DB.productType.findOne({
      attributes: ['id'],
      where: { name: productTypeName },
    });

    if (!productType) {
      result.code = STATUS_CODES.PRECONDITION_FAILED;
      throw CONSTANTS.MESSAGES.HTTP.INVALID.PARAMS;
    }

    const newProduct = await DB.product.create({
      productTypeId: productType.id,
      name: name,
      price: price,
      unit: unit,
      createUserId: loginUserId,
    });

    res.status(STATUS_CODES.OK).send(newProduct.get({ plain: true }));
  });
}
