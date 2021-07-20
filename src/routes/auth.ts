import express, { Router } from "express"
import dotenv from "dotenv"; dotenv.config();
import { AuthController } from "../controllers/index"
import { UserMiddleware } from "../middlewares/UserMiddleware";
import Passport from "passport"

const router: Router = express.Router();

router.get("/",UserMiddleware.yetLogin, AuthController.getLogin);
router.get("/logout", AuthController.getLogout);
router.get("/verify", UserMiddleware.yetLogin, AuthController.getVerify);

router.post("/register", UserMiddleware.yetLogin, AuthController.postRegister);
router.post("/login", UserMiddleware.yetLogin, Passport.authenticate("local"), AuthController.postLogin);
router.get("/login-with-facebook",UserMiddleware.yetLogin, Passport.authenticate("facebook",{ scope: "email" }));
router.get('/facebook/callback', UserMiddleware.yetLogin,Passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/auth' }));

export default router;