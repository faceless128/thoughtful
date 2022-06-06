const router = require('express').Router();
const { getAllThoughts, createThought, getThoughtById, updateThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// Set up GET one, PUT (update), and DELETE at /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Set up POST at /api/pizzas/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// Set up DELETE at /api/pizzas/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;