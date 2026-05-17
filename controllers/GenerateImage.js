
import axios from "axios";

export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;

        // ✅ validation
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({ message: "Prompt is required" });
        }

        // ✅ Call Pexels API
        const response = await axios.get(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(prompt)}&per_page=1`,
            {
                headers: {
                    Authorization: process.env.PEXELS_API_KEY,
                },
            }
        );

        const photos = response.data.photos;

        // ✅ check if image exists
        if (!photos || photos.length === 0) {
            return res.status(404).json({ message: "No image found" });
        }

        // ✅ get first image
        const image_url = photos[0].src.large;

        return res.status(200).json({
            success: true,
            photo: image_url,
        });

    } catch (error) {
        console.error("Pexels Error:", error.message);

        return res.status(500).json({
            message: "Failed to fetch image",
        });
    }
};
