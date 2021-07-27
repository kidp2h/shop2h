import e, {Response, Request} from "express"
import { CartModel } from "../models"

export default new class CartController {
    async postAddItem(req : Request, res : Response){
        if(req.user._id){
            let productId = req.body.productId;
            let cart = await CartModel.getCartByUserId(req.user._id);
            console.log(cart.items);
            let found = cart.items.find(item => item.product._id == productId);
            if(found){
                await CartModel.updateCart(req.user._id,productId);
            }else{
                await CartModel.addItemToCart(req.user._id,productId);
            }
            
            return res.status(200).json({message : true});
        }else{
            return res.status(400).json({message : false})
        }
        
    }
}