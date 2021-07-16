
import express , {Request, Response,NextFunction} from "express"


const app = express();
export namespace UserMiddleware {
    export function RenderDataUser(){
        app.use(function(req : Request, res : Response, next : NextFunction){
            if(req.user){
                res.locals.item = req.user;
            }
            next();
        })
    }
}