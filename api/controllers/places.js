const isEmpty = require("lodash/isEmpty");

const User = require("../database/models/User");

const { BadRequest } = require("../utils/errors");
const { validatePlaceId } = require("../validation/places");

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

module.exports = {
  saveVisitedPlace,
  deleteVisitedPlace
};
