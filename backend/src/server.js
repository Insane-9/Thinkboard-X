import express from "express";
// const express = require('express');
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import rateLimiter from "./middlewares/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();

// middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
} 
app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});
app.use("/api/notes", notesRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
 
}
// start server

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
