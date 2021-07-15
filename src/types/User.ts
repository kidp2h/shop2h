import { Types, Document, Model } from "mongoose"

export interface IUser extends Document {
    _id: Types.ObjectId,
    username: string,
    password: string,
    email : string,
    gender?: string
}

export interface IUserModel extends Model<IUser> {
    createUser(data : IUser);
    findUserByUsername(username: IUser["username"]);
    findUserByEmail(email : IUser["email"]);
    comparePassword(userPwd: IUser["password"]);
    findUserById(id : IUser["id"]);
    
}

