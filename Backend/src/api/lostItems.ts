import express from "express";
import { createLostReport, deleteLostReport, getLostProductByCategory, geTLostReport, getLostReportById, UpdateReport } from "../application/lostItems";
import { asyncHandler } from "../utils";

export const lostRouter = express.Router();
lostRouter
    .route('/')
    .post(asyncHandler(createLostReport))
    .get(asyncHandler(geTLostReport));


lostRouter
    .route('/:id')
    .get(asyncHandler(getLostReportById))
    .patch(asyncHandler(UpdateReport))
    .delete(asyncHandler(deleteLostReport))
    .get(asyncHandler(getLostProductByCategory));
