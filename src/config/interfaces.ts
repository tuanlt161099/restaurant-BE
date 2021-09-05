import sequelize from 'sequelize';

export interface HTTPdata {
  code: number;
  message: string;
  data: any;
  transaction?: sequelize.Transaction;
  function: string;
}
