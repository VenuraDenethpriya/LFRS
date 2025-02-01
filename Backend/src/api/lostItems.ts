import express from "express";
import { createLostReport, deleteLostReport, getLostProductByCategory, geTLostReport, getLostReportById, UpdateReport } from "../application/lostItems";
import { asyncHandler } from "../utils";
import { isAuthonticated } from "./middleware/authentication-middleware";

export const lostRouter = express.Router();
lostRouter
    .route('/')
    /*.post(asyncHandler(async (req, res, next) => {
        await isAuthonticated(req, res, next);
        await createLostReport(req, res, next);
    }))*/
   .post(asyncHandler(createLostReport))
    .get(asyncHandler(geTLostReport));


lostRouter
    .route('/:id')
    .get(asyncHandler(getLostReportById))
    .patch(asyncHandler(UpdateReport))
    .delete(asyncHandler(deleteLostReport))
    .get(asyncHandler(getLostProductByCategory));
