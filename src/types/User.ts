import { Types, Document, Model } from "mongoose"

export interface IUser extends Document {
    _id: Types.ObjectId,
    username: string,
    password: string,
    email : string,
    gender?: string
}

export interface IUserModel extends Model<IUser> {
    //STATIC
    createUser(data : IUser);
    findUserByUsername(username: IUser["username"]);
    findUserByEmail(email : IUser["email"]);
    findUserById(id : IUser["_id"] | string);
    updateVerifyUser(id : IUser["_id"] | string);
    updateInfo(id : IUser["_id"] | string, data : Object);
    //METHODS
    comparePassword(userPwd: IUser["password"]);
    
}

