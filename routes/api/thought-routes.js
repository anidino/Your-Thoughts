const router = require("express").Router();
const {
    getAllThoughts,
    getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts/ 
router.route("/").get(getAllThoughts).post(addThought);

// /api/thoughts/:id (GET, PUT, DELETE)
router
.route("/:id")
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);


// // /api/thoughts/:userId  (POST) 
// router.route("/:userId").post(addThought);

// /api/thoughts/:thoughtId/reactions (POST, DELETE)
router.route("/:thoughtId/reactions").post(addReaction).delete(removeReaction); 

// /api/thoughts/:thoughtId/reactionId (DELETE)
// router.route('/:thoughtId/reactions/:reactions').post(addReaction).delete(removeReaction);

module.exports = router;