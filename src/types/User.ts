import { Types, Document, Model } from "mongoose"

export interface IUser extends Document {
    _id?: Types.ObjectId,
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
    }
    
}

export interface IUserModel extends Model<IUser> {
    //STATIC
    createUser(data : Partial<IUser>);
    findUserByUsername(username: IUser["local"]["username"]);
    findUserByEmail(email : IUser["local"]["email"]);
    findUserById(id : IUser["_id"] | string);
    findUserByIdFacebook(id);
    updateVerifyUser(id : IUser["_id"] | string);
    updateInfo(id : IUser["_id"] | string, data : Object);
    //METHODS
    comparePassword(userPwd: IUser["local"]["password"]);
    
}

