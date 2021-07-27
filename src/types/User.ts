import { Types, Document, Model } from "mongoose"
import { ICart } from "./Cart"
export interface IUser extends Document {
    _id : String | Types.ObjectId
    gender?: string
    address? : string,
    describe? : string,
    verify? : {
        isVerify : Boolean,
        tokenVerify : string,
    },
    local : {
        username : string,
        password : string,
        email : string
    },
    facebook? : {
        id : string, 
        email : string,
        username : string,
    },
    cart : String | ICart
    
}

export interface IUserModel extends Model<IUser> {
    //STATIC
    createUser(data : Partial<IUser>);
    findUserByUsername(username: IUser["local"]["username"]);
    findUserByEmail(email : IUser["local"]["email"]);
    findUserById(id : IUser["_id"]);
    findUserByIdFacebook(id);
    updateVerifyUser(id : IUser["_id"]);
    updateInfo(id : IUser["_id"], data : Object);
    //METHODS
    comparePassword(userPwd: IUser["local"]["password"]);
    
}

