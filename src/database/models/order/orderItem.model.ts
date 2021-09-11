import sequelize from 'sequelize';
import ORM from '../../database.auth';
import { OrderItem } from '../../database.entities';
import ProductModel from '../product/prdoduct.model';
import Order from './order';

const OrderItemModel = ORM.define<OrderItem>(
  'oder_item',
  {
    id: {
      type: sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: sequelize.DataTypes.STRING(50),
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: ProductModel,
        key: 'id',
      },
    },
    orderId: {
      type: sequelize.DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: Order,
        key: 'id',
      },
    },
    discount_item: {
      type: sequelize.DataTypes.DOUBLE(2, 2),
      defaultValue: 0,
      validate: {
        isNumeric: true,
      },
    },
    amount: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    unit: {
      type: sequelize.DataTypes.STRING(10),
      allowNull: false,
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
    createdAt: 'createDateTime',
    updatedAt: 'editDateTime',
  },
);

export default OrderItemModel;
