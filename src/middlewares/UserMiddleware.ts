import {Request, Response,NextFunction, Application} from "express"
export namespace UserMiddleware {
    //this function will set locals item : user to save req.user to render into the views
    export function RenderDataUser(app : Application ){
        app.use(function(req : Request, res : Response, next : NextFunction){
            console.log(req.user);
            if(req.user){
                res.locals.user = req.user;
            }else{
                res.locals.user = false;
            }
            next();
        })
    }
}