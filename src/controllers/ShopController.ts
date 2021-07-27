import {Request, Response} from "express";
import { UserModel, ProductModel } from "../models";
import { UserUtility } from "../utils/UtilityUser";

export default new class ShopController {
    async getShop(req : Request , res : Response){
        res.render("shop")
    }
}