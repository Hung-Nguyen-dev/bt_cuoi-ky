const express = require("express");
const User = require("../db/userModel");
const mongoose = require("mongoose");
const UserRouter = express.Router();

UserRouter.get("/list", async (req, res) => {
    try {
        const users = await User.find({}, "_id first_name last_name");
        // Ensure we always return an array, even if empty
        res.json(users || []);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        // Log detailed error stack
        console.error("Error stack:", error.stack);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

UserRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(400).json({ error: "User not found" });
    }
});

UserRouter.post("/login", async (req, res) => {
    try {
        const { login_name } = req.body;
        
        if (!login_name) {
            return res.status(400).json({ error: "Login name is required" });
        }

        const user = await User.findOne({ login_name });
        
        if (!user) {
            return res.status(400).json({ error: "Invalid login name" });
        }

        // In a real application, you would also verify the password here

        const token = generateToken(user);
        
        res.status(200).json({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(400).json({ error: "Login failed" });
    }
});

module.exports = UserRouter;