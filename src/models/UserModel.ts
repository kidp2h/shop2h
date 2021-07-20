import Mongoose, {Schema} from "mongoose"
import dotenv from "dotenv";dotenv.config();
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid"
import  {IUser, IUserModel} from "../types/User";

const UserSchema : Schema<IUser, IUserModel>  = new Schema<IUser>({
    username : {
        type : String, 
        trim:true
    },
    email :{
        type : String,
        trim: true
    },
    password : {
        type : String,
        trim : true
    },
    gender : {
        type : String, 
        default : "male"
    },
    address : String,
    describe : String,
    verify : {
        isVerify : {type : Boolean, default : false},
        tokenVerify : {type : String, default : uuidv4()}
    },
    
    // ,
    // facebook : {
    //     id : {type : String, default : null},
    //     email : {type : String, default : null}
    // }
    // cart : [/*IProduct*/],
},{timestamps : true})

UserSchema.statics = {
    async createUser(data : IUser){
        return await this.create(data);
    },
    async findUserByUsername(username : IUser["username"]){
        return await this.findOne({ username : username})   
    },
    async findUserByEmail(email : IUser["email"]){
        return await this.findOne({ email : email})   
    },
    async findUserById(id : IUser["_id"]){
        return await this.findOne({_id : id});
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
    comparePassword(userPwd : IUser["password"]) : boolean {
        return bcrypt.compareSync(<string>userPwd, <string>this.password);
    }
}

UserSchema.pre("save",function(this : IUser,next) {
    if(!this.isModified('password')){
        return next();
    }else{
        this.password = bcrypt.hashSync(this.password, Number(process.env.SALT_HASH));
        return next();
    }
})

export default Mongoose.model<IUser, IUserModel>("users",UserSchema);