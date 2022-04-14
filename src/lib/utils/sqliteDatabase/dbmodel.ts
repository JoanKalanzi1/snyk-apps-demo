
import { Model, Table,Column,DataType } from 'sequelize-typescript'



  @Table({
    timestamps: true,
  })
export class User extends Model{
  
    @Column(DataType.TEXT) userId!: string;
    @Column(DataType.TEXT)
  get orgs(): string[] {
    const rawValue = this.getDataValue('orgs');
        return rawValue ? rawValue.split(",") : [];
  }
 set orgs(value: string[]) {
    const newData = value.toString()
    this.setDataValue('orgs', newData)
  }
  @Column(DataType.TEXT)  access_token!: string;
  @Column(DataType.INTEGER)  expires_in!: number;
  @Column(DataType.TEXT)  scope!: string;
  @Column(DataType.TEXT)  token_type!: string;
  @Column(DataType.TEXT)  refresh_token!: string;
  @Column(DataType.TEXT)  nonce!: string;
 


}



// export function UserFactory(sequelize: Sequelize): User{
//     return sequelize.define('users',{
//     userId: {
//         type:DataType.STRING

//     },
//     orgs:{
//         type:DataType.STRING,
//         get(this:UserModel) : string[]{
//             const rawValue = this.getDataValue('orgs');
//             return rawValue ? rawValue.split(",") : [];
//         },
//         set(this: UserModel, val: string[]){
//             const newData = val.toString()
//          this.setDataValue('orgs', newData)
//         }
//     },
//     access_token:{
//         type:DataType.STRING
//     },
//     expires_in:{
//         type:DataType.NUMBER
//     },
//     scope:{
//         type:DataType.STRING
//     },
//     token_type:{
//         type:DataType.STRING
//     },
//     refresh_token:{
//         type:DataType.STRING
//     },
//     nonce:{
//         type:DataType.STRING
//     }

// }, {
//         timestamps: true    
// })}

