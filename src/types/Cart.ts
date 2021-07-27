import {Document, Model} from "mongoose"
import { IUser } from "./User"

export interface ICart extends Document {
    userId : String | Partial<IUser>,
    items : Array<Object>
}

export interface ICartModel extends Model<ICart> {
    createCart(userId);
    getCartByUserId(userId);
    addItemToCart(userId, productId);
    updateCart(userId, productId);
}