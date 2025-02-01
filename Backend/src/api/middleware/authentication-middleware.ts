import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

export const isAuthonticated = ( req:Request, res:Response, next:NextFunction ) => {
    if(!getAuth(req).userId){
        throw new Error(`User not authenticated`);
    }
    next();
}