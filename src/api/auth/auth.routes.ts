import express from 'express';
import STATUS_CODES from 'http-status';
import CONSTANTS from '../../config/contants';
import errorHandler from '../../config/errorHandler';
import DB from '../../database/database.service';
import authService from './auth.service';

const authRouter = express.Router();

/**post APIs */
authRouter.post('/login', login());

export default authRouter;

/**========================================================= */
/** functions */

function login() {
  const result = { ...CONSTANTS.RESULT, function: 'login()' };
  return errorHandler(result, async (req: express.Request, res: express.Response) => {
    const loginUsername = req.body.username;
    const loginPassword = req.body.password;

    if (!loginUsername || !loginPassword) {
      result.code = STATUS_CODES.PRECONDITION_FAILED;
      throw CONSTANTS.MESSAGES.HTTP.REQUIRED.PARAMS;
    }

    const user = await DB.user.findOne({
      attributes: [
        'id',
        'username',
        'password',
        'fullName',
        'age',
        'phone',
        'email',
        'avatar',
        'isActive',
        'loginDateTime',
        'authToken',
      ],
      where: { username: loginUsername },
      include: [
        {
          model: DB.userType,
          as: 'userType',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!user) {
      result.code = STATUS_CODES.UNAUTHORIZED;
      throw CONSTANTS.MESSAGES.AUTH.USER_NOT_FOUND;
    }

    if (!user.isActive) {
      result.code = STATUS_CODES.UNAUTHORIZED;
      throw CONSTANTS.MESSAGES.AUTH.USER_DIACTIVED;
    }

    const isPass = authService.comparePassword(loginPassword, user.password || '');

    if (!isPass) {
      result.code = STATUS_CODES.UNAUTHORIZED;
      throw CONSTANTS.MESSAGES.AUTH.PASS_INCORRECT;
    }

    const token = authService.getToken(user);
    user.authToken = token;
    user.loginDateTime = new Date();
    user.save();

    res.status(STATUS_CODES.OK).send({ access_token: token });
  });
}
