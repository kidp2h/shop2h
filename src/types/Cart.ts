import {Document, Model, ObjectId} from "mongoose"
import { IUser } from "./User"
import {IProduct} from "./Product"

export interface ICart extends Document {
    userId : String | Partial<IUser>,
    items : Array<{
        product : IProduct | ObjectId, 
        quantity : number
    }>
}

export interface ICartModel extends Model<ICart> {
    createCart(userId);
    getCartByUserId(userId);
    addItemToCart(userId, productId);
    updateCart(userId, productId);
}