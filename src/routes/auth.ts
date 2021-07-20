import express, { Router, Request, Response } from "express"
import dotenv from "dotenv"; dotenv.config();
import { AuthController } from "../controllers/index"
import Passport from "passport"

const router: Router = express.Router();

router.get("/", AuthController.getLogin);
router.get("/logout", AuthController.getLogout);
router.get("/verify",AuthController.getVerify);

router.post("/register", AuthController.postRegister);
router.post("/login", Passport.authenticate("local"), AuthController.postLogin);

export default router;