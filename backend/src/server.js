import express from "express";
// const express = require('express');
import dotenv from "dotenv";
import cors from "cors";

import rateLimiter from "./middlewares/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});
app.use("/api/notes", notesRoutes);
