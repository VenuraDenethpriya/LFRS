import express from "express";
import { connectDB } from "./infrastructure/db";
import 'dotenv/config';
import { lostRouter } from "./api/lostItems";
import { foundRouter } from "./api/foundItems";
import { categoryRounter } from "./api/category";

const app = express();

app.use(express.json());

app.use('/api/lostitem', lostRouter)
app.use('/api/founditem', foundRouter)
app.use('/api/category', categoryRounter)

connectDB();
app.listen(8000, ()=> console.log('Server running on port 8000'))