import Mongoose , {Schema} from "mongoose"
import {IProduct, IProductModel} from "../types/Product";


const ProductSchema : Schema<IProduct, IProductModel> = new Schema({
    name : String,
    image : String,
    category : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : "categories"
    },
    size : [String],
    color : [String],
    price : Number,
    sale : Number,
    purchases : Number
},{timestamps : true})

ProductSchema.statics = {
    createNewProduct(data : Object){
        return this.create(data);
    },
    getProductById(id : IProduct["id"] | string){
        return this.findOne({_id : id}).populate("category");
    },
    getListProducts(skip : number,limit : number){
        return this.find({}).skip(skip).limit(limit).populate("category");
    }
}

ProductSchema.methods = {

}

export default Mongoose.model<IProduct, IProductModel>("products", ProductSchema);