const router = require('express').Router();
const {
    getThought,
    addThought,
    getThoughtById,
    updateThought,
    removeThought,
    addReaction,
    removeReaction,
    
    

} = require("../../controllers/thought-controller");

router.route('/')
    .get(getThought)
    .post(addThought)


// api/thoughts/<userId>/<thoughtId>
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

router.route('/:thoughtId/reactions')
    .post(addReaction)

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)


module.exports = router;