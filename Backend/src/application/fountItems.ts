import { Request, Response, NextFunction } from "express";
import FoundReport from "../infrastructure/schemas/FoundReport";

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
        const foundReport = await FoundReport.find()
        if(foundReport){
            return res.status(200).json(foundReport).send();
        }
        return res.status(200).send("No found reports found");
    } catch (error) {
        next(error);
    }
}

export const getFoundReportById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const foundReport = await FoundReport.findById(id)
        if(foundReport){
            return res.status(200).json(foundReport).send();
        }
        return res.status(200).send("No found report found");
    } catch (error) {
        next(error);
    }
}

export const updateFoundReport = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const foundReport = await FoundReport.findByIdAndUpdate(id, req.body)
        if(foundReport){
            return res.status(200).json(foundReport).send("Your found report has been updated");
        }
        return res.status(200).send("No found report found");
    } catch (error) {
        next(error);
    }
}

export const deleteFoundReport = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const foundReport = await FoundReport.findByIdAndDelete(id)
        if(foundReport){
            return res.status(200).send("You have successfully deleted the report");
        }
        return res.status(200).send("No found report found");
    } catch (error) {
        next(error)
    }
}