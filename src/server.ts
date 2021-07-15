import app from "./app";
import http from "http";
import dotenv from "dotenv";dotenv.config();


new class Server {

    constructor(){
        this.startServer();
    }

    startServer() : void {
        let server : any = http.createServer(app);
        server.listen(process.env.SERVER_PORT,(err : any) : void  => {
            if(err){
                console.log(err);
            }
            console.log(`🚀🔥 Server is running with port ${process.env.SERVER_PORT}`);
        });
        server.setTimeout(15000);
    }
}
