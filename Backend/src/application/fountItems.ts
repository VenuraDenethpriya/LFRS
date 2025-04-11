import { Request, Response, NextFunction } from "express";
import FoundReport from "../infrastructure/schemas/FoundReport";
import NotFoundError from "../domain/errors/not-found-error";

export const createFoundReport = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const foundReport = await FoundReport.create(req.body)
        if(foundReport){
            return res.status(201).json(foundReport).send();
        }
        return res.status(200).send("Something went wrong");
    } catch (error) {
        next(error);
    }
}

export const getFoundReport = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const foundReport = await FoundReport.find().populate('category')
        if(!foundReport){
            throw new NotFoundError("Could not find FoundReports")
        }
        return res.status(200).json(foundReport).send();
    } catch (error) {
        next(error);
    }
}

export const getFoundReportById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const foundReport = await FoundReport.findById(id).populate('category')
        if(!foundReport){
            throw new NotFoundError("Could not find FoundReport")
        }
        return res.status(200).json(foundReport).send();
    } catch (error) {
        next(error);
    }
}

export const updateFoundReport = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const foundReport = await FoundReport.findByIdAndUpdate(id, req.body)
        if(!foundReport){
           throw new NotFoundError("Could not find FoundReport")
        }
         return res.status(200).json(foundReport).send("Your found report has been updated");
    } catch (error) {
        next(error);
    }
}

export const deleteFoundReport = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const foundReport = await FoundReport.findByIdAndDelete(id)
        if(!foundReport){
           throw new NotFoundError("Could not find FoundReport")
        }
        return res.status(200).send("You have successfully deleted the report");
    } catch (error) {
        next(error)
    }
}