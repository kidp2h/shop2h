import express from "express"
const router : express.Router = express.Router();

router.get("/",(req : express.Request, res : express.Response) : void => {
    res.render("index");
})

router.get("/contact",(req : express.Request, res : express.Response) : void => {
    res.render("contact");
})

router.get("/customer-review",(req : express.Request, res : express.Response) : void => {
    res.render("customer-review");
})

router.get("/team",(req : express.Request, res : express.Response) : void => {
    res.render("team");
})

router.get("/about",(req : express.Request, res : express.Response) : void => {
    res.render("about");
})
router.get("/blog",(req : express.Request, res : express.Response) : void => {
    res.render("blog");
})
router.get("/shop",(req : express.Request, res : express.Response) : void => {
    res.render("shop");
})

export default router;
