//Library
import express, {Request, Response, NextFunction} from "express";
import path from "path";
import cookieParser from "cookie-parser"
import logger from "morgan"
import dotenv from "dotenv"; dotenv.config();
import session from "express-session";
import cors from "cors"
import passport from "passport"
import sessionMemoryStore from "session-memory-store";
// Routes
import Routers from "./routes/Routers"
// Database
import Database from "./config/Database";
// Authenticate
import {InitializePassport} from "./auth/local"
//Middleware
import {UserMiddleware} from "./middlewares/UserMiddleware"

const Store = sessionMemoryStore(session)
class App {

    public express: express.Application

    constructor() {
        this.express = express();
        this.configApp();
        new Database();
    }

    public configApp() {
        const app : express.Application = this.express;
        //set views engine
        app.set('views', path.join(__dirname, "views"));
        app.set("view engine", "ejs");

        app.use(express.static(path.join(__dirname, 'public')));
        app.use(cors());
        app.use(logger("dev"));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());
        // session
        app.use(session({
            secret: 'keyboard cat',
            resave:true,
            saveUninitialized: true,
            cookie: { maxAge: 1000 * 60 * 50}
        }))
        // passport middleware
        app.use(passport.initialize());
        app.use(passport.session());
        // initialize passport
        InitializePassport();
        // middlwares app
        UserMiddleware.RenderDataUser(app);
        // initialize router
        app.use("/", Routers.IndexRouter);
        app.use("/auth", Routers.AuthRouter);
        app.use("/user", Routers.UserRouter);
        app.use("/shop", Routers.ShopRouter);
    }
}

export default new App().express;
