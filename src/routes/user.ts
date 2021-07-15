import express, { Router, Request, Response } from "express"
import dotenv from "dotenv"; dotenv.config();
import { UserController } from "../controllers/index"
import Passport from "passport"
import { InitializePassport } from "../auth/local";

const router: Router = express.Router();
InitializePassport();

router.get("/", (req: Request, res: Response): void => {
    res.render("login-register",{siteKey: process.env.SITE_KEY})
})

router.post("/register", UserController.postRegister);
router.post("/login", Passport.authenticate("local"),UserController.postLogin);



export default router;