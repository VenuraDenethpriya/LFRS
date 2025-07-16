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

const app = express();
const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.VITE_CLERK_SECRET_KEY

app.use(express.json());
app.use(clerkMiddleware({
   publishableKey,secretKey
}))

app.use(cors({ 
    origin:`http://localhost:5173`,
    credentials: true,
}));


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
