
import Passport from "passport";
import Local from "passport-local"
import UserModel from "../models/UserModel"
import {UserUtility} from "../utils/UtilityUser"
import {IUser} from "../types/User"

export const InitializePassport = () : void => {
    Passport.use(new Local.Strategy(async function(username, password, done){
        let user = await UserUtility.checkAccount(username, password);
        if(user){
            return done(null, user);
        }else{
            return done(null,false);
        }
    }))

    Passport.serializeUser((user : IUser, done) : void => {
        done(null, user._id)
    })

    Passport.deserializeUser(async (id : IUser["_id"], done) => {
        const user : IUser = await UserModel.findUserById(id);
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })


}


