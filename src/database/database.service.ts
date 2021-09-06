import UserModel from './models/user.model';
import UserTypeModel from './models/userType.model';

class DatabseService {
  public user = UserModel;
  public userType = UserTypeModel;
}

const DB = new DatabseService();

export default DB;
