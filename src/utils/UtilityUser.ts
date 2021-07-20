import {UserModel} from "../models/index"
import {IUser, IUserModel} from "../types/User"

export namespace UserUtility {
    export async function checkAccount(username : IUser["local"]["username"], password : IUser["local"]["password"]) : Promise<IUser|boolean>{
        const user  = await UserModel.findUserByUsername(username);
        if(user){
            if(user.comparePassword(password)){
                return user;
            }else{
                return false;
            };
        }else{
            return false
        }
    }
}
