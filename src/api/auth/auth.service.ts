import { User } from '../../database/database.entities';
import jsonwebtoken from 'jsonwebtoken';
import Crypto from 'crypto-js';
import ENV from '../../config/env';
class AuthService {
  getToken(user: User) {
    return jsonwebtoken.sign(
      {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        emai: user.email,
        isActive: user.isActive,
        loginDateTime: user.loginDateTime,
        userTypeName: user.userType?.name,
      },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES_IN },
    );
  }

  public comparePassword = (loginPass: string, userEncodedPass: string) => {
    const decodePass = Crypto.AES.decrypt(userEncodedPass, ENV.CRYPTO_SECRET);
    if (decodePass.toString(Crypto.enc.Utf8) === loginPass) return true;
    else return false;
  };
}

const authService = new AuthService();

export default authService;
