import express, {Router} from "express"
const router : Router = express.Router();
import {UserController} from "../controllers/index"
import {UserMiddleware} from "../middlewares/UserMiddleware"


router.get("/settings",UserMiddleware.isLogin,UserController.getSettings)
router.post("/save",UserMiddleware.isLogin,UserController.postSave);

export default router;