import {Document, Types, Model} from "mongoose"

export interface IProduct extends Document {
    name : string,
    image : string,
    category : string,
    size : string,
    color : string,
    price : number,
    sale : number,
    purchases : number
}

export interface IProductModel extends Model<IProduct> {
    createNewProduct(data : Object);
    getProductById(id);
    getListProducts(skip : number, limit : number);
    
}