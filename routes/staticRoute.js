const express = require("express");
const router = express.Router();
const { checkForAuthentication } = require("../middlewares/auth");
const {visitShortUrl} = require("../controllers/url");

router.get("/", (req, res) => {
    return res.render("home");
})

router.get("/signup", (req, res) => {
    return res.render("signup");
})

router.get("/login", (req, res) => {
    return res.render("login");
})

router.get("/generateShortid", checkForAuthentication, (req, res) => {
    return res.render("generate-shortid");
})

router.get("/:shortId", visitShortUrl)



module.exports = router;