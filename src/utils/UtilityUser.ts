import UserModel from "../models/UserModel"
import {IUser, IUserModel} from "../types/User"

export namespace UserUtility {
    export async function checkAccount(username : IUser["username"], password : IUser["password"]) : Promise<IUser|boolean>{
        const user  = await UserModel.findUserByUsername(username);
        console.log(password)
        if(user.comparePassword(password)){
            return user;
        }else{
            return false;
        };
    
    }
}
