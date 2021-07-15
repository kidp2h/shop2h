import { Request, Response, NextFunction } from "express"
import axios from "axios"
import UserModel from "../models/UserModel"
import { IUser } from "../types/User"


export default new class UserController {
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
                let user = await UserModel.createUser(data)
                return res.status(200).json({message: "success" });
            }
        }else{
            return res.status(401).json({captcha :"captcha",message : (response.data["error-codes"])[0]})
        }
    }

    postLogin(req : Request, res : Response){
        return res.status(200).json({message:"success"})
    }
}