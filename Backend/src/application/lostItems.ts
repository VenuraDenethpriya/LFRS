import { Response, Request, NextFunction } from "express";
import LostReport from "../infrastructure/schemas/LostReport";


export const createLostReport = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const report = await LostReport.create(req.body)
        if (report) {
            res.status(201).json(report).send("You have successfully created a report")
        }
        res.status(200).send('Something went wrong try again')
    }
    catch (error) {
        next(error)
        res.status(500).send('Internal Server Error')
    }
}

export const geTLostReport = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const lostReport = await LostReport.find()
        res.status(200).json(lostReport).send()
    } catch (error) {
        next(error)
        res.status(500).send('Internal Server Error')
    }
}

export const getLostReportById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const id = req.params.id;
        const lostReport = await LostReport.findById(id);
        if (lostReport) {
            res.status(200).json(lostReport)
        }
        res.status(404).send('Report not found')
    } catch (error) {
        next(error)
        res.status(500).send('Internal Server Error')
    }
}

export const deleteLostReport = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const id = req.params.id;
        const lostReport = await LostReport.findByIdAndDelete(id);
        if (lostReport) {
            res.status(200).send("You have successfully deleted the report")
        }
        res.status(404).send('Report not found')
    } catch (error) {
        next(error)
        res.status(500).send('Internal Server Error')
    }
 }

export const UpdateReport = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const id = req.params.id;
        const lostReport = await LostReport.findByIdAndUpdate(id, req.body)
        if (lostReport) {
            res.status(200).json(lostReport).send("You have successfully updated the report status")
        }
        res.status(404).send('Report not found')
    } catch (error) {
        next(error)
        res.status(500).send('Internal Server Error')
    }
}

export const getLostProductByCategory = async (req:Request, res:Response, next:NextFunction) => {
    const category = req.params.category
    try {
        const lostReport = await LostReport.find({category: category});
        if(lostReport){
          res.status(200).json(lostReport).send()  
        }
        res.status(404).send("Report not found")
    } catch (error) {
        next(error);
        res.status(500).send('Internal Server Error')
    }
}