import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import Color from "colors";

const db = new PrismaClient();

function logRequest(req: Request, res: Response, next: NextFunction){
    const req_text = "[request]";
    const mtd_text = req.method;
    const pth_txt = req.url;

    res.send(
        console.log(`${Color.yellow(req_text)} ${Color.blue(mtd_text)} ${Color.blue(pth_txt)}`)
    );
}

export default {
    LogRequest: logRequest
}