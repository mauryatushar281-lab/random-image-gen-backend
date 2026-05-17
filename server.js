import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ✅ Load env FIRST
dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import posts from "./routes/Posts.js"
import generateImageRoute from "./routes/GenerateImage.js";
import connectDB from "./config/db.js";

// ✅ Now connect DB
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: "https://random-image-frontend.vercel.app/", // React app
    credentials: true
}));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/post", posts);
app.use("/api/users", userRoutes);
app.use("/api/generate-image", generateImageRoute);


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});