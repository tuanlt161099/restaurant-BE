import sequelize from 'sequelize';
import ORM from '../../database.auth';
import { Table } from '../../database.entities';

const TableModel = ORM.define<Table>(
  '_table',
  {
    id: {
      type: sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    table_number: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      },
    },
    isActive: {
      type: sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: 'createDateTime',
    updatedAt: 'editDateTime',
  },
);

export default TableModel;
