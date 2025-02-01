import { Response, Request, NextFunction } from "express";
import LostReport from "../infrastructure/schemas/LostReport";
import NotFoundError from "../domain/errors/not-found-error";
import { getAuth } from "@clerk/express";


export const createLostReport = async(req:Request, res:Response, next:NextFunction) => {
    try {
        //const createdBy = getAuth(req).userId;
        //const report = await LostReport.create({createdBy, ...req.body})
        const report = await LostReport.create(req.body)
        if (report) {
            return res.status(201).json({message: "You have successfully created a report"})
        }
        
        return res.status(200).json({message: 'Something went wrong try again'})
    }
    catch (error) {
        next(error)
    }
}

export const geTLostReport = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const lostReport = await LostReport.find().populate('category').populate('nearestPoliceStation', 'name')
        
        if(!lostReport){
            throw new NotFoundError("Lost reports not found")
        }
        return res.status(200).json(lostReport).send()
    } catch (error) {
        next(error)
    }
}

export const getLostReportById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const id = req.params.id;
        const lostReport = await LostReport.findById(id).populate('category')
        if (!lostReport) {
            throw new NotFoundError("Lost report not found")
        }
        return res.status(200).json(lostReport)
       
    } catch (error) {
        next(error)
    }
}

export const deleteLostReport = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const id = req.params.id;
        const lostReport = await LostReport.findByIdAndDelete(id);
        if (!lostReport) {
           throw new NotFoundError("Lost report not found")
        }
        return res.status(200).send("You have successfully deleted the report")
    } catch (error) {
        next(error)
    }
 }

export const UpdateReport = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const id = req.params.id;
        const lostReport = await LostReport.findByIdAndUpdate(id, req.body)
        if (!lostReport) {
           throw new NotFoundError("Lost report not found")
        }
        return res.status(200).json(lostReport).send("You have successfully updated the report status")
    } catch (error) {
        next(error)
    }
}

export const getLostProductByCategory = async (req:Request, res:Response, next:NextFunction) => {
    
    try {
        const {category} = req.query
        const lostReport = await LostReport.find({category});
        if(!lostReport){
          throw new NotFoundError("Lost report not found")
        }
        return res.status(200).json(lostReport).send()
    } catch (error) {
        next(error);
    }
}