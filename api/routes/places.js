const express = require("express");

const router = express.Router();

const { saveVisitedPlace, deleteVisitedPlace } = require("../controllers/places");
const auth = require("../middlewares/auth");


router.patch("/", auth, saveVisitedPlace);

router.patch("/delete-place", auth, deleteVisitedPlace);

module.exports = router;
