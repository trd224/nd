const express = require("express");
const router = express.Router();
const {generateNewShortUrl, getAllUrls} = require("../controllers/url");
const {checkForAuthentication} = require("../middlewares/auth");

router.post("/", checkForAuthentication, generateNewShortUrl);
router.get("/", getAllUrls)


module.exports = router;