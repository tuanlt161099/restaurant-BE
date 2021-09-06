import sequelize from 'sequelize';
import { UserTypeName } from '../config/enum';

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
  authToken?: number;
  isActive: boolean;
  createUserId?: number;
  createDateTime: Date | string;
  editUserId?: number;
  editDateTime: Date | string;
  /** relationship */
  userType?: UserType;
}
