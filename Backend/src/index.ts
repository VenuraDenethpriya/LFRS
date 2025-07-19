import express from "express";
import { connectDB } from "./infrastructure/db";
import 'dotenv/config';
import { lostRouter } from "./api/lostItems";
import { foundRouter } from "./api/foundItems";
import { categoryRounter } from "./api/category";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import cors from 'cors';
import { clerkMiddleware } from "@clerk/express";
import { dashboardRouter } from "./api/dashboard";
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');


const app = express();
const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.CLERK_SECRET_KEY
const frontendUrl = process.env.FRONTEND_URI;

app.use(express.json());

app.use(cors({ 
    origin:`http://65.0.99.199`,
    credentials: true,
    allowedHeaders: [
        "Authorization", 
        "Content-Type", 
        "Origin", 
        "Accept"
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
}));

app.use(clerkMiddleware({
    publishableKey,
    secretKey
}))
// app.use(ClerkExpressRequireAuth());



//Pre-middleware
app.use((req, res, next) => {
    console.log("Request received")
    console.log(req.method, req.url);
    next();
})

app.use('/api/lostitem', lostRouter)
app.use('/api/founditem', foundRouter)
app.use('/api/category', categoryRounter)
app.use('/api/dashboard', dashboardRouter);
app.use(globalErrorHandlingMiddleware as any)

connectDB();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
