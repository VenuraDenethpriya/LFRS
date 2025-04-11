import { Request, Response, NextFunction } from "express";
import Category from "../infrastructure/schemas/Category";
import NotFoundError from "../domain/errors/not-found-error";


export const createCaregory = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const caategory = await Category.create(req.body)
        if (Category) {
            return res.status(201).json(caategory).send("You have created a new category")
        }
    } catch (error) {
        next(error);
    }
}

export const getCategories = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const category = await Category.find()
        if (!category) {
            throw new NotFoundError(`Category not found`);
        }
        return res.status(200).json(category)
    } catch (error) {
        next(error);
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const id = req.params.id;
        const category = await Category.findByIdAndDelete(id)
        if(!category){
            throw new NotFoundError(`Category not found`);
        }
        return res.status(200).send("You successfully deleteed the category")
    } catch (error) {
        next(error)
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const id = req.params.id;
        const category = await Category.findByIdAndUpdate(id, req.body)
        if (!category) {
           throw new NotFoundError("Category not found")
        }
        return res.status(200).json(category).send("You have updated the category")
    } catch (error) {
        next(error)
    }
}