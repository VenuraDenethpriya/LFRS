import express from "express";
import { connectDB } from "./infrastructure/schemas/db";
import 'dotenv/config';

const app = express();

app.use(express.json());

connectDB();
app.listen(8000, ()=> console.log('Server running on port 8000'))