import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import languageRoutes from "./routes/languageRoutes.js";
import hobbyRoutes from "./routes/hobbyRoutes.js";

import path from "path";

dotenv.config();
const app = express();

// middleware
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://mohammadsaani-portfolio.vercel.app",
]

app.use(
  cors({
    origin: function (origin, callback) {

      if (
        !origin ||
        allowedOrigins.includes(origin)
      ) {

        callback(null, true)

      } else {

        callback(
          new Error("Not allowed by CORS")
        )
      }
    },
    credentials: true,
  })
)
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/hobbies", hobbyRoutes);
app.use("/uploads", express.static("uploads"));
// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
