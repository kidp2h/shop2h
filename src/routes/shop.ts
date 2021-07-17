import express , {Router, Request, Response} from "express"

const router : Router = express.Router();

router.get("/",(req : Request, res : Response) : void => {
    res.render("shop", {user : req.user});
})
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