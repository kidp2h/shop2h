import express, { Router, Request, Response } from "express"
import dotenv from "dotenv"; dotenv.config();
import { UserController } from "../controllers/index"
import Passport from "passport"

const router: Router = express.Router();

router.get("/", UserController.getLogin);
router.get("/logout", UserController.getLogout);

router.post("/register", UserController.postRegister);
router.post("/login", Passport.authenticate("local"),UserController.postLogin);

export default router;