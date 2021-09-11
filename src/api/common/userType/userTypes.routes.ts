import express from 'express';
import STATUS_CODES from 'http-status';
import CONSTANTS from '../../../config/contants';
import errorHandler from '../../../config/errorHandler';
import DB from '../../../database/database.service';

const userTypeRoter = express.Router();

userTypeRoter.get('/', getUserTypeList());

export default userTypeRoter;
/** ================================================================================== */
/** functions */
function getUserTypeList() {
  const result = { ...CONSTANTS.RESULT, function: 'getUserTypeList()' };
  return errorHandler(
    result,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const userTypeList = await DB.userType.findAll({
        attributes: ['id', 'name'],
        order: [['createDateTime', 'ASC']],
      });
      if (userTypeList.length > 0)
        res
          .status(STATUS_CODES.OK)
          .send(userTypeList.map((userType) => userType.get({ plain: true })));
      else res.status(STATUS_CODES.NO_CONTENT).send([]);
    },
  );
}
