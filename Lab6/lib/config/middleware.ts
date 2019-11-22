import {Request,Response} from 'express';
export class Middleware{
    public URL_COUNTER_LOGGER:any;
    constructor(){
        this.URL_COUNTER_LOGGER={};
    }

    public urlLogger(req: Request, res:Response):void{
        let originalUrl = req;
        let originalUrlPathName = req.originalUrl;
        if (this.URL_COUNTER_LOGGER[originalUrlPathName]) {
            this.URL_COUNTER_LOGGER[originalUrlPathName]++;
        } else {
            this.URL_COUNTER_LOGGER[originalUrlPathName] = 1;
        }
        if (Object.keys(this.URL_COUNTER_LOGGER).length > 0) {
            console.log('Count :\n', this.URL_COUNTER_LOGGER);
        }
    }

    public requestLogger(req:Request, res:Response):void{
        console.log(
            `\n[${new Date().toUTCString()}] ${req.method} ${req.originalUrl}`
        );
    }

}