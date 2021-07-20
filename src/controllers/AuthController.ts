import { Request, Response } from "express"
import axios from "axios"
import UserModel from "../models/UserModel"
import * as UserVerify from "../helpers/verify"


export default new class AuthController {
    
    getLogout(req : Request, res : Response){
        req.logout();
        res.redirect("/auth");
    }

    async getLogin(req : Request, res : Response) {
        if(req.isAuthenticated()){
            res.render("shop",{user : req.user});
        }else{
            res.render("login-register",{siteKey : process.env.SITE_KEY})
        }
    }

    async postRegister(req: Request, res: Response) {
        const data = req.body
        let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${data.captcha}&remoteip=${req.connection.remoteAddress}`)
        if (response.data.success) {
            let userExist = await UserModel.findUserByUsername(data.username)
            let emailExist = await UserModel.findUserByEmail(data.email)
            if(userExist && emailExist){
                return res.status(401).json({ both:"both",message: "failed-register" });
            }else if (userExist) {
                return res.status(401).json({ account:"account",message: "failed-register" });
            }else if(emailExist){
                return res.status(401).json({ email:"email",message: "failed-register" });
            }else {
                let user = await UserModel.createUser(data);
                let result = await UserVerify.sendMailVerify(user._id, user.email, user.verify.tokenVerify)
                console.log(result);
                return res.status(200).json({message: "success" });
            }
        }else{
            return res.status(401).json({captcha :"captcha",message : (response.data["error-codes"])[0]})
        }
    }

    postLogin(req : Request, res : Response){
        if(req.user){
            return res.status(200).json({message : "success"});
        }
    }
    async getVerify(req: Request, res : Response){
        if(req.query.id && req.query.token){
            let user = await UserModel.findUserById(<string>req.query.id)
            if(user){
                if(user.verify.tokenVerify == req.query.token && user.verify.isVerify == false){
                    await UserModel.updateVerifyUser(<string>req.query.id);
                    res.send("Yes, your account is verified !!")
                }else{
                    res.redirect("/auth");
                }
            }else{
                res.redirect("/auth");
            }
        }else{
            res.redirect("/auth");
        }
    }
}