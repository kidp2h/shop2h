import Mongoose, {Schema} from "mongoose"
import {ICart, ICartModel} from "../types/Cart"


const CartSchema : Schema<ICart, ICartModel> = new Schema({
    userId : {
        type : String,
        ref : "users"
    },
    items : [{
        product : {
            type : String,
            ref : "products"
        },
        quantity : {
            type : Number,
            default : 1
        }
    }]
    
},{timestamps : true})

CartSchema.statics = {
    createCart(userId){
        return this.create({userId : userId})
    },
    getCartByUserId(userId){
        return this.findOne({userId : userId}).populate("items.product")
    },
    addItemToCart(userId,productId : string){
        return this.updateOne({userId : userId},{$push : {"items":{product : productId}}})
    },
    updateCart(userId, productId){
        return this.updateOne({userId : userId,"items.product":productId},{$inc :{"items.$.quantity" : 1}})
    }
}

export default Mongoose.model<ICart, ICartModel>("carts",CartSchema)