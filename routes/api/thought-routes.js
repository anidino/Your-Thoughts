const router = require("express").Router();
const {
    getAllThoughts,
    getThoughtById,
  addThought,
  updateThought,
  removeThought,
} = require("../../controllers/thought-controller");

// /api/thoughts/ 
router.route("/").get(getAllThoughts);

// /api/thoughts/:thoughtId 
router.route("/:thoughtId").get(getThoughtById);

// /api/thoughts/create/:userId
router.route("/:userId").post(addThought);

// /api/thoughts/update/:thoughtId
router.route("/update/:thoughtId").put(updateThought);

// /api/thoughts/delete/:userId/:ThoughtId
router.route("/:userId/:thoughtId").delete(removeThought);

module.exports = router;