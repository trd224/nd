const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/auth");
const Url = require("../models/url");

router.get("/", (req, res) => {
    return res.render("home");
})

router.get("/signup", (req, res) => {
    return res.render("signup");
})

router.get("/login", (req, res) => {
    return res.render("login");
})

router.get("/generateShortid", authenticate, authorize(["NORMAL","ADMIN"]), async (req, res) => {
    const urls = await Url.find({createdBy: req.user._id});
    return res.render("generate-shortid", {urls});
}) 

router.get("/admin", authenticate, authorize(["ADMIN"]), (req, res) => {
    return res.render("admin");
})





module.exports = router;