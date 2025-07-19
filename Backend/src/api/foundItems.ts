import express from 'express';
import { createFoundReport, deleteFoundReport, getFoundReport, getFoundReportById, updateFoundReport } from '../application/fountItems';
import { asyncHandler } from '../utils';
import { isAuthonticated } from './middleware/authentication-middleware';

export const foundRouter = express.Router();

foundRouter.route('/').post(asyncHandler(createFoundReport)).get(asyncHandler(getFoundReport));
foundRouter.route('/:id').get(asyncHandler(getFoundReportById)).patch(asyncHandler(updateFoundReport)).delete(asyncHandler(deleteFoundReport))