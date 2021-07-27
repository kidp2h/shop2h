

declare var grecaptcha : any;
declare var Toastify : any
declare var ScrollReveal;
declare var sr;

declare namespace Express {
    export interface Request {
        user: IUser;
    }
    export interface Response {
        user: any;
    }
}