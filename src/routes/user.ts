import express, {Router} from "express"
const router : Router = express.Router();
import {UserController} from "../controllers/index"
import {UserMiddleware} from "../middlewares/UserMiddleware"


router.get("/settings",UserMiddleware.checkLogin,UserController.getSettings)
router.post("/save",UserMiddleware.checkLogin,UserController.postSave);

export default router;