import { Sequelize } from 'sequelize';

export default function getSqliteInstance(dpPath: string) {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dpPath,
  });
  return sequelize;
}
