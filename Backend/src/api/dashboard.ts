import express from 'express';
import { asyncHandler } from '../utils';
import { getDashboardData } from '../application/dashboard';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { isAdmin } from './middleware/authorization-middleware';

export const dashboardRouter = express.Router();

dashboardRouter
    .route('/')
    .get((ClerkExpressRequireAuth(),isAdmin,asyncHandler(getDashboardData)))