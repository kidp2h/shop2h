import Mongoose, {Schema} from "mongoose"
import dotenv from "dotenv";dotenv.config();
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid"
import  {IUser, IUserModel} from "../types/User";

const UserSchema : Schema<IUser, IUserModel>  = new Schema<IUser>({
    gender : String,
    address : String,
    describe : String,
    verify : {
        isVerify : {type : Boolean, default : false},
        tokenVerify : {type : String, default : uuidv4()}
    },
    local : {
        username : String,
        email : String,
        password : String,
    },
    facebook : {
        id : String, 
        email : String,
        username: String
    }
    // cart : [/*IProduct*/],
},{timestamps : true})

UserSchema.statics = {
    async createUser(data : IUser){
        return await this.create(data);
    },
    async findUserByUsername(username : IUser["local"]["username"]){
        return await this.findOne({"local.username" : username})   
    },
    async findUserByEmail(email : IUser["local"]["username"]){
        return await this.findOne({"local.email" : email})   
    },
    async findUserById(id : IUser["_id"]){
        return await this.findOne({_id : id});
    },
    async findUserByIdFacebook(id){
        return await this.findOne({"facebook.id" : id});
    },
    async updateVerifyUser(id : IUser["_id"]){
        return await this.updateOne({_id : id},{$set : {
            "verify.isVerify":true
        }})
    },
    async updateInfo(id : IUser["_id"], data){
        return await this.updateOne({_id : id},data)
    }
}
UserSchema.methods = {
    comparePassword(userPwd : IUser["local"]["password"]) : boolean {
        return bcrypt.compareSync(<string>userPwd, <string>this.local.password);
    }
}

UserSchema.pre("save",function(this : IUser,next) {
    if(!this.isModified('local.password')){
        return next();
    }else{
        this.local.password = bcrypt.hashSync(this.local.password, Number(process.env.SALT_HASH));
        return next();
    }
})

export default Mongoose.model<IUser, IUserModel>("users",UserSchema);