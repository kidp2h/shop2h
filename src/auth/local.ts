
import Passport from "passport";
import Local from "passport-local"
import UserModel from "../models/UserModel"
import {UserUtility} from "../utils/UtilityUser"
import {IUser} from "../types/User"

export const InitializePassport = () : void => {
    Passport.use(new Local.Strategy(async function(username, password, done){
        let user = await UserUtility.checkAccount(username, password);
        console.log(user);
        if(user){
            return done(null, user);
        }else{
            return done({result : false},null);
        }
    }))

    Passport.serializeUser((user : IUser, done) : void => {
        done(null, user._id)
    })

    Passport.deserializeUser(async (id : IUser["_id"], done) => {
        const user = await UserModel.findUserById(id);
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })


}


