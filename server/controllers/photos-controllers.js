const { mongoose } = require("mongoose");

const HttpError = require("../models/http-error");
const Photo = require("../models/photo");
const User = require("../models/user");

const getPhotosByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userWithPhotos;
  try {
    userWithPhotos = await User.findById(userId).populate("photos");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching photos. " + err,
      500
    );
    return next(error);
  }

  if (!userWithPhotos || userWithPhotos.photos.length === 0) {
    return next(
      new HttpError("Could not find photos for the provided user ID", 404)
    );
  }

  res.json({
    photos: userWithPhotos.photos.map((photo) =>
      photo.toObject({ getters: true })
    ),
  });
};

const createPhotos = async (req, res, next) => {
  const { images, creator } = req.body;
  const createdPhotos = new Photo({
    images,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Creating failed " + err, 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Couldn't find user for provided ID ", 500);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPhotos.save({ session: sess });
    user.photos.push(createdPhotos);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, try again + " + err,
      500
    );
    return next(error);
  }

  res.status(201).json({ photos: createdPhotos });
};

exports.getPhotosByUserId = getPhotosByUserId;
exports.createPhotos = createPhotos;
