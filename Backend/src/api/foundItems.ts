import express from 'express';
import { createFoundReport, deleteFoundReport, getFoundReport, getFoundReportById, updateFoundReport } from '../application/fountItems';
import { asyncHandler } from '../utils';
import { isAuthonticated } from './middleware/authentication-middleware';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { isAdmin } from './middleware/authorization-middleware';

export const foundRouter = express.Router();

// foundRouter.route('/').post(asyncHandler(createFoundReport)) .get(asyncHandler(getFoundReport));
foundRouter.route('/')
  .post((ClerkExpressRequireAuth(), asyncHandler(createFoundReport)))
  .get((ClerkExpressRequireAuth(), asyncHandler(getFoundReport)));

foundRouter.route('/:id')
    .get(((ClerkExpressRequireAuth(),isAdmin,asyncHandler(getFoundReportById))))
    .patch((ClerkExpressRequireAuth(),asyncHandler(updateFoundReport)))
    .delete((ClerkExpressRequireAuth(),asyncHandler(deleteFoundReport)))