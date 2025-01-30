import express from "express";
import { connectDB } from "./infrastructure/db";
import 'dotenv/config';
import { lostRouter } from "./api/lostItems";
import { foundRouter } from "./api/foundItems";
import { categoryRounter } from "./api/category";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({ origin:`http://localhost:5174`}));
//Pre-middleware
app.use((req, res, next) => {
    console.log("Request received")
    console.log(req.method, req.url);
    next();
})

app.use('/api/lostitem', lostRouter)
app.use('/api/founditem', foundRouter)
app.use('/api/category', categoryRounter)
app.use(globalErrorHandlingMiddleware as any)

connectDB();
app.listen(8000, ()=> console.log('Server running on port 8000'))