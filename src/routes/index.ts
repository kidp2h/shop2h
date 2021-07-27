import express from "express"
const router : express.Router = express.Router();

import {UserModel,CategoryModel, ProductModel, CartModel} from "../models"

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


// router.get("/test",async (req : express.Request, res : express.Response)  => {
//     //console.log(await UserModel.findUserById("60fe39814e555e37e8bad40d"))
//     // await UserModel.updatePassword("60fe39814e555e37e8bad40d", "1234");
//     let data = {
//         name : req.query.nameP,
//         image : `/images/product/${req.query.name}`,
//         category : req.query.category,
//         color : ["black","red","purple","grey","green","blue"],
//         size : ["m","s","l","x","xl","xxl"],
//         price : Math.floor(Math.random() * 5000000) + 1000000,
//         sale :  Math.floor(Math.random() * 2000000) + 1000000,
//         purchases : Math.floor(Math.random() * 10000) + 5000
//     };
//     await ProductModel.createNewProduct(data);
//     res.status(200).json({mes : "200"});
    
// })
// router.get("/test2",async (req : express.Request, res : express.Response)  => {
//     let cat = ["Books","Furniture", "Decorations","Bags","Accessories"]
//     for (const ele of cat) {
//         await CategoryModel.createCategory(ele);
//     }
    
// })

// router.get("/test3",async (req : express.Request, res : express.Response)  => {
//     console.log(await CartModel.getCartByUserId("60fe4c9d9899dc3af40f5554"));

// })

// router.get("/test4",async (req : express.Request, res : express.Response)  => {
//     await CartModel.addItemToCart("60fe4c9d9899dc3af40f5554","60fe632b873632492c8d75e9")
//     res.status(200).json({mes : "200"});
// })

// router.get("/test5",async (req : express.Request, res : express.Response)  => {
//     let kq = await CartModel.getCartByUserId("60fe4c9d9899dc3af40f5554")
//     res.status(200).json({mes : "200"});
// })
export default router;
