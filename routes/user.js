const express = require("express");
const {userSignup, userLogin, getUserByQuery} = require("../controllers/user");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/", getUserByQuery)

module.exports = router;