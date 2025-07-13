import express from 'express';
import { asyncHandler } from '../utils';
import { getDashboardData } from '../application/dashboard';

export const dashboardRouter = express.Router();

dashboardRouter.route('/').get(asyncHandler(getDashboardData));