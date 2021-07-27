import express , {Router, Request, Response} from "express"
import { ShopMiddleware } from "../middlewares";
import { ShopController } from "../controllers";
const router : Router = express.Router();

router.get("/", ShopMiddleware.transferProductToShop, ShopController.getShop)

router.get("/product-details",(req : Request, res : Response) : void => {
    res.render("product-details")
})
router.get("/checkout",(req : Request, res : Response) : void => {
    res.render("checkout")
})
router.get("/cart",(req : Request, res : Response) : void => {
    res.render("cart")
})


export default router