import { Request, Response, NextFunction } from "express"
import {ProductModel} from "../models"
import {IProduct} from "../types/Product"
import _ from "lodash";
export namespace ShopMiddleware {
    export async function transferProductToShop(req : Request, res : Response, next : NextFunction){
        let listProduct = await ProductModel.getListProducts(0,20);
        res.locals.products = listProduct;
        next();
    }
}