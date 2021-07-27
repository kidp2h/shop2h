import Mongoose, { Schema } from "mongoose"
import dotenv from "dotenv"; dotenv.config();
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid"
import { IUser, IUserModel } from "../types/User";
import {ICart} from "../types/Cart"
import CartModel from "./CartModel"

const UserSchema: Schema<IUser, IUserModel> = new Schema<IUser>({
    gender: String,
    address: String,
    describe: String,
    verify: {
        isVerify: { type: Boolean, default: true },
        tokenVerify: { type: String, default: uuidv4() }
    },
    local: {
        username: String,
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        email: String,
        username: String
    },
    cart: {
        type: String,
        ref: "carts"
    }
}, { timestamps: true })

UserSchema.statics = {
    createUser(data: IUser) {
        return this.create(data);
    },
    findUserByUsername(username: IUser["local"]["username"]) {
        return this.findOne({ "local.username": username })
    },
    findUserByEmail(email: IUser["local"]["username"]) {
        return this.findOne({ "local.email": email })
    },
    findUserById(id: IUser["_id"]) {
        return this.findOne({ _id: id }).populate({
            path : "cart",
            populate : {
                path : "items.product",
            }
        });
    },
    findUserByIdFacebook(id) {
        return this.findOne({ "facebook.id": id });
    },
    updateVerifyUser(id: IUser["_id"]) {
        return this.updateOne({ _id: id }, {
            $set: {
                "verify.isVerify": true
            }
        })
    },
    updateInfo(id: IUser["_id"], data) {
        return this.updateOne({ _id: id }, data)
    },
    updatePassword(userId, newPass){
        return this.updateOne({_id : userId},{"local.password" : newPass })
    }
}
UserSchema.methods = {
    comparePassword(userPwd: IUser["local"]["password"]): boolean {
        return bcrypt.compareSync(<string>userPwd, <string>this.local.password);
    }
}

UserSchema.pre("save", async function (this : IUser, next) {
    if (!this.isModified('local.password')) {
        return next();
    } else {
        this.local.password = bcrypt.hashSync(this.local.password, Number(process.env.SALT_HASH));
        const cart : ICart = await CartModel.createCart(this._id);
        this.cart = cart._id
        return next();
    }
})


export default Mongoose.model<IUser, IUserModel>("users", UserSchema);