const express = require("express");
const router = express.Router();
const {generateNewShortUrl, getAllUrls, visitShortUrl} = require("../controllers/url");
const { authenticate, authorize } = require("../middlewares/auth");

router.post("/", authenticate, authorize(["NORMAL"]), generateNewShortUrl);
router.get("/", getAllUrls)
router.get("/:shortId", visitShortUrl)


module.exports = router;