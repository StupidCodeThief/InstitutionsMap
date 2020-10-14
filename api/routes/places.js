const express = require("express");

const router = express.Router();

const { saveVisitedPlace, deleteVisitedPlace, addComment, getComments } = require("../controllers/places");
const auth = require("../middlewares/auth");

router.patch("/", auth, saveVisitedPlace);

router.patch("/delete-place", auth, deleteVisitedPlace);

router.patch("/add-comment", auth, addComment);
router.get("/get-comments/:id", auth, getComments);

module.exports = router;
