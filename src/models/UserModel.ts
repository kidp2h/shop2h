import Mongoose, {Schema} from "mongoose"
import dotenv from "dotenv";dotenv.config();
import bcrypt from "bcrypt"
import  {IUser, IUserModel} from "../Types/User";

const UserSchema : Schema<IUser, IUserModel>  = new Schema<IUser>({
    username : {
        type : String, 
        trim:true
    },
    password : {
        type : String, 
    },
    email : {
        type : String,
        trim : true
    },
    gender : {
        type : String, 
        default : "male"
    }
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
        return await this.findOne({id : id});
    }
}
UserSchema.methods = {
    comparePassword(userPwd : IUser["password"]) : boolean {
        return bcrypt.compareSync(<string>userPwd, <string>this.password);
    }
}

UserSchema.pre("save",function(this : IUser,next) {
    console.log(this.validateSync());
    if(!this.isModified('password')){
        return next();
    }else{
        console.log()
        this.password = bcrypt.hashSync(this.password, Number(process.env.SALT_HASH));
        return next();
    }
})

export default Mongoose.model<IUser, IUserModel>("users",UserSchema);