import { UserTypeName } from './config/enum';
import ENV from './config/env';
import DB from './database/database.service';
import Crypto from 'crypto-js';

export const initData = () => {
  Object.values(UserTypeName).forEach((name) =>
    DB.userType
      .findOrCreate({
        where: { name: name },
        defaults: { name: name },
      })
      .then(([userType]) => {
        if (userType.name === UserTypeName.admin)
          DB.user
            .findOrCreate({
              where: { username: 'admin' },
              defaults: {
                username: 'admin',
                password: Crypto.AES.encrypt('admin', ENV.CRYPTO_SECRET).toString(),
                fullName: 'admin',
              },
            })
            .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err)),
  );
};
