import express from "express"
import { createCaregory, deleteCategory, getCategories, updateCategory } from "../application/categories";
import { asyncHandler } from "../utils";

export const categoryRounter = express.Router();

categoryRounter.route('/').post(asyncHandler(createCaregory)).get(asyncHandler(getCategories))
categoryRounter.route('/:id').delete(asyncHandler(deleteCategory)).patch(asyncHandler(updateCategory));