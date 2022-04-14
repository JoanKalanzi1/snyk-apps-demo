import { Sequelize } from 'sequelize-typescript';
import { join } from 'path'
import { User } from './dbmodel'

const dbFolder = join(__dirname, '../../../database');
const dbPath = join(dbFolder, 'db.sqlite');


 const dbConfig = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  models: [User]
})

export default dbConfig


