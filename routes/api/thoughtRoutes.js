const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction, 
    removeReaction
} = require('../../controllers/thoughtController');

// get all thoughts, create new thought
//don't forget to push the created thought's _id to the associated user's thoughts array field
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// get single thought, update thought, delete thought
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;
