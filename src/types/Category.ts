import {Document, Model, Types} from "mongoose"

export interface ICategory extends Document {
    _id : string | Types.ObjectId
    name : string
}

export interface ICategoryModel extends Model<ICategory> {
    createCategory(name : string)
    getListTypes();
}