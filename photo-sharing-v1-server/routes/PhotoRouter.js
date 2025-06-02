const express = require("express");
const Photo = require("../db/photoModel");
const PhotoRouter = express.Router();

PhotoRouter.get("/photosOfUser/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const photos = await Photo.find({ user_id: id });
        if (!photos || photos.length === 0) {
            return res.status(404).json({ error: "No photos found for this user" });
        }

        const result = await Promise.all(photos.map(async (photo) => {
            let comments = [];
            if (photo.comments && photo.comments.length > 0) {
                comments = photo.comments.map((comment) => {
                    return {
                        _id: comment._id,
                        date_time: comment.date_time,
                        comment: comment.comment,
                        user: {
                            _id: comment.user._id,
                            first_name: comment.user.first_name,
                            last_name: comment.user.last_name
                        }
                    };
                });
            }

            return {
                _id: photo._id,
                date_time: photo.date_time,
                file_name: photo.file_name,
                user_id: photo.user_id,
                comments: comments
            };
        }));

        res.json(result);
    } catch (error) {
        console.error("Error fetching photos:", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = PhotoRouter;