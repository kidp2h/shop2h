import passport from "passport";
import Facebook from "passport-facebook";
import {UserModel} from "../models/index"
import {IUser} from "../types/User"
export let InitializePassportFacebook = () => {
    passport.use(new Facebook.Strategy({
        clientID: process.env.APP_FB_CLIENT_ID,
        clientSecret : process.env.APP_FB_CLIENT_SECRET,
        callbackURL : process.env.APP_FB_CALLBACK,
        profileFields: ['id', 'emails', 'name']
    
    },async (accessToken, refreshToken, profile, done) => {
        let exist = await UserModel.findUserByIdFacebook(profile.id);
        if(exist){
            return done(null,exist);
        }else{
            let account : Partial<IUser> = {
                facebook : {
                    id : profile.id,
                    email : profile.emails[0].value,
                    username : (profile.emails[0].value).match(/[A-Za-z0-9]+[^@]+/)[0]
                }
            }
            let user = await UserModel.create(account);
            return done(null,user);
        }
    }))
}


