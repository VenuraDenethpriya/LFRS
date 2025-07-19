import express from "express";
import { createLostReport, deleteLostReport, getLostProductByCategory, geTLostReport, getLostReportById, UpdateReport } from "../application/lostItems";
import { asyncHandler } from "../utils";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { isAdmin } from "./middleware/authorization-middleware";

export const lostRouter = express.Router();
lostRouter
    .route('/')
    /*.post(asyncHandler(async (req, res, next) => {
        await isAuthonticated(req, res, next);
        await createLostReport(req, res, next);
    }))*/
   .post((ClerkExpressRequireAuth(),asyncHandler(createLostReport)))
    .get((ClerkExpressRequireAuth(),asyncHandler(geTLostReport)));


lostRouter
    .route('/:id')
    .get((ClerkExpressRequireAuth(),isAdmin, asyncHandler(getLostReportById)))
    .patch((ClerkExpressRequireAuth(),asyncHandler(UpdateReport)))
    .delete((ClerkExpressRequireAuth(),asyncHandler(deleteLostReport)))
    .get((ClerkExpressRequireAuth(),asyncHandler(getLostProductByCategory)));
