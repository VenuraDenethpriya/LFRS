import { Request, Response, NextFunction } from "express";

const globalErrorHandlingMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    if(error.name === "NotFoundError"){
        return res.status(404).json({
            message: error.message
        }).send()
    }
    else if(error.name === "ValidationError"){
        return res.status(400).json({
            message: error.message
        }).send()
    }
    else {
        res.status(500).json({
            message: "Internal Server Error"
        }).send();
    }
}

export default globalErrorHandlingMiddleware;