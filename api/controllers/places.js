const isEmpty = require("lodash/isEmpty");

const User = require("../database/models/User");
const Place = require("../database/models/Place");

const { BadRequest } = require("../utils/errors");
const { validatePlaceId, validateComment } = require("../validation/places");

const saveVisitedPlace = async (req, res, next) => {
  try {
    const { placeId } = req.body;

    const errors = validatePlaceId(placeId);

    if (!isEmpty(errors)) {
      throw new BadRequest(errors);
    }

    const { visitedPlaces } = await User.findById(req.user.id).select("visitedPlaces");

    if (visitedPlaces.length) {
      const duplication = visitedPlaces.filter((id) => id === placeId);

      if (duplication.length) throw new BadRequest("Duplicate", "Place already saved!");
    }

    await User.updateOne({ _id: req.user.id }, { $push: { visitedPlaces: placeId } });

    res.json({ msg: "Account updated" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const deleteVisitedPlace = async (req, res, next) => {
  try {
    const { placeId } = req.body;

    console.log(placeId);

    const errors = validatePlaceId(placeId);

    if (!isEmpty(errors)) {
      throw new BadRequest(errors);
    }

    await User.updateOne({ _id: req.user.id }, { $pullAll: { visitedPlaces: [placeId] } });

    res.json({ msg: "Account updated" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { placeId, comment } = req.body;

    const errors = validateComment(placeId, comment);

    if (!isEmpty(errors)) {
      throw new BadRequest(errors);
    }

    const user = await User.findById(req.user.id).select("-password");
    const place = await Place.findOne({ place: placeId });

    const newComment = {
      text: comment,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    if (place) {
      place.comments.unshift(newComment);

      await place.save();
      res.json({ msg: "Comment added" });
    } else {
      const newPlace = new Place({
        place: placeId,
        comments: [newComment]
      });

      await newPlace.save();

      res.json({ msg: "Comment added" });
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const { placeId } = req.body;

    const errors = validatePlaceId(placeId);

    if (!isEmpty(errors)) {
      throw new BadRequest(errors);
    }

    const place = await Place.findOne({ place: placeId });

    if (place) {
      res.json(place.comments);
    } else {
      res.json({ msg: "No comments for this place!" });
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  saveVisitedPlace,
  deleteVisitedPlace,
  addComment,
  getComments
};
