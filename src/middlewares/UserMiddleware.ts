import {Request, Response,NextFunction, Application} from "express"
import { CategoryModel, CartModel } from "../models";
import { ICart } from "../types/Cart";
export namespace UserMiddleware {
    //this function will set locals item : user to save req.user to render into the views
    export function DataUserLocal(app : Application ){
        app.use(async function(req : Request, res : Response, next : NextFunction){
            // category
            let listTypes = CategoryModel.getListTypes();
            res.locals.types = listTypes;
            if(req.user){
                // info user
                res.locals.user = req.user;
                // cart user
                const cart : ICart = await CartModel.getCartByUserId(req.user._id);
                res.locals.cart = cart[0];

            }else{
                res.locals = {
                    user : false,
                    cart : false
                }
            }
            next();
        })
    }

    export const isLogin = (req : Request, res : Response, next : NextFunction) => {
        if(req.isAuthenticated()){ 
            next();
        }else{
            res.redirect("/auth");
        }
    }   

    export const yetLogin = (req : Request, res : Response, next : NextFunction) => {
        if(!req.isAuthenticated()){ 
            next();
        }else{
            res.redirect("/shop");
        }
    }   
        
    
}