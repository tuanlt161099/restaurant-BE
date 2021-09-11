import sequelize from 'sequelize';
import { UserTypeName, ProductTypeName } from '../config/enum';

export interface UserType extends sequelize.Model {
  readonly id: number;
  name: UserTypeName;
  createDateTime: Date | string;
  editDateTime: Date | string;
  /** Relationship */
  userList?: User[];
}

export interface User extends sequelize.Model {
  readonly id: number;
  userTypeId: number;
  username: string;
  password?: string;
  fullName: string;
  age?: number;
  phone?: string;
  avatar?: string;
  loginDateTime?: Date | string;
  authToken?: string;
  isActive: boolean;
  createUserId?: number;
  createDateTime: Date | string;
  editUserId?: number;
  editDateTime: Date | string;
  email: string;
  /** relationship */
  userType?: UserType;
}

export interface Product extends sequelize.Model {
  readonly id: number;
  productTypeId: number;
  name: string;
  price: number;
  unit?: string;
  createUserId?: number;
  createDateTime: Date | string;
  editUserId?: number;
  editDateTime: Date | string;
  /** relationship */
  productType: ProductType;
  orderItemList?: OrderItem[];
}
export interface ProductType extends sequelize.Model {
  readonly id: number;
  name: ProductTypeName;
  createDateTime: Date | string;
  editDateTime: Date | string;
  /** relationship */
  productList?: Product[];
}
export interface OrderItem extends sequelize.Model {
  readonly id: number;
  productId: number;
  orderId: number;
  discount_item: number;
  amount: number;
  price: number;
  unit: string;
  createUserId?: number;
  createDateTime: Date | string;
  editUserId?: number;
  editDateTime: Date | string;
  /** relationship */
  product: Product;
  order: Order;
}
export interface Order extends sequelize.Model {
  readonly id: number;
  discount: number;
  subTotal: number;
  total: number;
  tableId: number;
  amount: number;
  createUserId?: number;
  createDateTime: Date | string;
  editUserId?: number;
  editDateTime: Date | string;
  /** relationship */
  orderItemList?: OrderItem[];
  tableNumber: Table;
}

export interface Table extends sequelize.Model {
  readonly id: number;
  table_number: number;
  isActive: boolean;
  createDateTime: Date | string;
  editDateTime: Date | string;

  /**Relationship */
  Order: Order;
  OrderList?: Order[];
}
