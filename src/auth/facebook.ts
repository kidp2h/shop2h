import passport from "passport";
import Facebook from "passport-facebook";
import {UserModel} from "../models/index"
import {IUser} from "../types/User"
export let InitializePassportFacebook = () => {
    passport.use(new Facebook.Strategy({
        clientID: process.env.APP_FB_CLIENT_ID,
        clientSecret : process.env.APP_FB_CLIENT_SECRET,
        callbackURL : process.env.APP_FB_CALLBACK
    
    },async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        // let account : Partial<IUser> = {
        //     facebook : {
        //         id : profile.id,
        //         email : profile.emails.values[0]
        //     }
        // }
        // let user = await UserModel.create(account);
        // console.log(user);
    }))
}


