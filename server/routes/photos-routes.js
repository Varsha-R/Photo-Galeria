const express = require("express");

const photosController = require("../controllers/photos-controllers");

const router = express.Router();

router.get("/user/:uid", photosController.getPhotosByUserId);

router.post("/", photosController.createPhotos);

module.exports = router;
