import ProductModel from './models/product/prdoduct.model';
import ProductTypeModel from './models/product/productType.model';
import UserModel from './models/user/user.model';
import UserTypeModel from './models/user/userType.model';

class DatabseService {
  public user = UserModel;
  public userType = UserTypeModel;
  public product = ProductModel;
  public productType = ProductTypeModel;
}

const DB = new DatabseService();

export default DB;
