
import Post from "../models/Posts.js";

// --------------------
// 📥 Get all posts
// --------------------
export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json({ success: true, data: posts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// --------------------
// 📝 Create new post
// --------------------
export const createPost = async (req, res, next) => {
    try {
        const { name, prompt, photo } = req.body;

        // ✅ Directly store photo (base64 or URL)
        const newPost = await Post.create({
            name,
            prompt,
            photo,
        });

        return res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};