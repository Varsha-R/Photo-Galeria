const express = require("express");

const photosController = require("../controllers/photos-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router("../middleware/check-auth.js");

router.get("/user/:uid", photosController.getPhotosByUserId);

// Middleware to catch unauthenticated users
router.use(checkAuth);

router.post("/", photosController.createPhotos);

module.exports = router;
