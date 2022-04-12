import { DateTime } from 'luxon';
import { Model, DataTypes , Sequelize} from 'sequelize'
import getSqliteInstance from './database';
import {sqliteInstance} from '../../../app'
const sequelize = new Sequelize('sqlite::memory:')

class User extends Model {
    declare access_token: string;
    declare userId: string;
    declare orgs: string[];
    declare expire_in: number;
    declare scope: string;
    declare token_type: string;
    declare refresh_token: string;
    declare nonce : string;
    declare updatedAt: DateTime;
    declare createdAt: DateTime;
};
console.log(sqliteInstance)
User.init({
    userId: {
        type:DataTypes.STRING

    },
    orgs:{
        type:DataTypes.STRING,
        get(this:User) : string[]{
            const rawValue = this.getDataValue('orgs');
            return rawValue ? rawValue.split(",") : null;
        }
    },
    access_token:{
        type:DataTypes.STRING
    },
    expires_in:{
        type:DataTypes.INTEGER
    },
    scope:{
        type:DataTypes.STRING
    },
    token_type:{
        type:DataTypes.STRING
    },
    refresh_token:{
        type:DataTypes.STRING
    },
    nonce:{
        type:DataTypes.STRING
    }

}, {
    sequelize: sqliteInstance,
        modelName: 'user',
        timestamps: true    
})
export default User;
