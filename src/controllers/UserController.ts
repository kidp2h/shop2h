import { Request, Response, Express } from "express"
import {IUser} from "../types/User"
import axios from "axios"
import UserModel from "../models/UserModel"
import _ from "lodash"
export default new class UserController {
    getSettings(req: Request, res : Response) {
        res.render('settings');
    }
    async postSave(req : Request, res : Response){
        let data = req.body;
        const user : IUser = <IUser>req.user;

        for(const [key, value] of Object.entries(data)){
            if(value == "" || value == null){
                delete data[key];
            }
        }
        let result = await UserModel.updateInfo(user._id,data);
        
        if(result){
            return res.status(200).json({message : "updated"});
        }else{
            return res.status(200).json({message : "failed",code:"2604"});
        }
    }
}