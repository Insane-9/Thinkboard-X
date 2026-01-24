import express from "express";
// const express = require('express');
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middlewares/rateLimiter.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})

app.use(express.json());
app.use(rateLimiter);
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});
app.use("/api/notes", notesRoutes);

