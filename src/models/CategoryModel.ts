import Mongoose, {Schema} from "mongoose"
import { ICategory, ICategoryModel } from "../types/Category";

const CategorySchema : Schema<ICategory,ICategoryModel> = new Schema({
    name : String
},{timestamps : true})

CategorySchema.statics = {
    createCategory(name : string){
        return this.create({name : name});
    },
    getListTypes(){
        return this.find({});
    }
}

export default Mongoose.model<ICategory,ICategoryModel>("categories",CategorySchema)
