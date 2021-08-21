import Mongoose, {Schema, Types} from "mongoose"
import {ICart, ICartModel} from "../types/Cart"
import fs from "fs"
import util from "util"


const CartSchema : Schema<ICart, ICartModel> = new Schema({
    userId : {
        type : String,
        ref : "users"
    },
    items : [{
        product : {
            type : Mongoose.Schema.Types.ObjectId,
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
        let cart = this.aggregate([
            {$lookup : {
                from : "users",
                localField : "userId",
                foreignField : "_id",
                as : "_user"
            }},
            {$unwind : {
                path : "$_user",
                preserveNullAndEmptyArrays: true
            }},
            {$unwind : {path : "$items"}},
            {$lookup :{
                from : "products",
                localField : "items.product",
                foreignField : "_id",
                as : "items.product"
            }},
            {$unwind : {path : "$items.product"}},
            {$lookup : {
                from : "categories",
                localField : "items.product.category",
                foreignField : "_id",
                as : "items.product.category"
            }},
            {$addFields : {summary : {$sum : {$multiply : ["$items.quantity","$items.product.sale"]}}}},
            {$group : {
                _id : "$_id",
                items : {
                    $push : {
                        quantity : "$items.quantity",
                        product : "$items.product"
                    }
                },
                summary : {
                    $sum : "$summary"
                }
            }}
        ])
        return cart;
    },
    addItemToCart(userId,productId : string){
        return this.updateOne({userId : userId},{$push : {"items":{product : Mongoose.Types.ObjectId(productId)}}})
    },
    updateCart(userId, productId){
        return this.updateOne({userId : userId,"items.product":productId},{$inc :{"items.$.quantity" : 1}})
    }
}

export default Mongoose.model<ICart, ICartModel>("carts",CartSchema)