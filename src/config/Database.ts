import mongoose from "mongoose";
import dotenv from "dotenv"; dotenv.config();

export default class ConnectDatabase {

    constructor(){
        this.Connect();
    }

    async Connect(){
        try {
            await mongoose.connect(process.env.DB_URI,{useNewUrlParser : true,useUnifiedTopology:true,useFindAndModify: true});
        } catch (error) {
            throw new Error(error);
        }
    }
}