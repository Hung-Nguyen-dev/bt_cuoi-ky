const express = require("express");
const User = require("../db/userModel");
const mongoose = require("mongoose");
const UserRouter = express.Router();

UserRouter.get("/list", async (req, res) => {
    try {
        const users = await User.find({}, "_id first_name last_name")
        res.json(users)
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

UserRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne({ _id: id })
        res.json(user)
    } catch (error) {
        res.status(400).json({ error: "User not found" });
    }
})

module.exports = UserRouter