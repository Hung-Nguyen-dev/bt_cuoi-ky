const express = require("express");
const User = require("../db/userModel");
const AdminRouter = express.Router();

AdminRouter.post("/login", async (req, res) => {
    try {
        const login_name = req.body.login_name;
        const user = await User.findOne({ login_name })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json("Login failed")
    }
})

module.exports = AdminRouter;
