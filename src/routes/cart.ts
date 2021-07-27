import express , {Router, Request, Response} from "express";
const router : Router = express.Router();
import {CartController} from "../controllers"

router.post("/addItem",CartController.postAddItem)

export default router;