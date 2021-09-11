import sequelize from 'sequelize';
import ORM from '../../database.auth';
import { Order } from '../../database.entities';
import TableModel from '../table/table.model';
import UserModel from '../user/user.model';
import OrderItemModel from './orderItem.model';

const OrderModel = ORM.define<Order>(
  'order',
  {
    id: {
      type: sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    discount: {
      type: sequelize.DataTypes.DOUBLE(2, 2),
      defaultValue: 0,
      validate: {
        isNumeric: true,
      },
    },
    subTotal: {
      type: sequelize.DataTypes.DOUBLE(12, 2),
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    total: {
      type: sequelize.DataTypes.DOUBLE(12, 2),
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    amount: {
      type: sequelize.DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
    },
    tableId: {
      type: sequelize.DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: TableModel,
        key: 'id',
      },
    },
    createUserId: {
      type: sequelize.DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    editUserId: {
      type: sequelize.DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  },
  {
    freezeTableName: true,
    createdAt: 'CreateDateTime',
    updatedAt: 'editDateTime',
  },
);
/** Association with OderItem */
OrderModel.hasMany(OrderItemModel, {
  sourceKey: 'id',
  foreignKey: 'orderId',
  as: 'orderItemList',
});
OrderItemModel.belongsTo(OrderModel, {
  targetKey: 'id',
  foreignKey: 'orderId',
  as: 'order',
});
/** association with user table */
OrderModel.belongsTo(UserModel, {
  targetKey: 'id',
  foreignKey: 'createUserId',
  as: 'createUser',
});
OrderModel.belongsTo(UserModel, {
  targetKey: 'id',
  foreignKey: 'editUserId',
  as: 'editUser',
});
export default OrderModel;
