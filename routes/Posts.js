import express from "express";
import { createPost, getAllPosts } from "../controllers/Posts.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
// 🔍 Search API
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const results = await Post.find({
            $or: [
                { name: { $regex: query, $options: "i" } },   // search by name
                { prompt: { $regex: query, $options: "i" } }  // search by prompt
            ]
        });

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Error searching posts", error });
    }
});
export default router;