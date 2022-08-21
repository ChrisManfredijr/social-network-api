const router = require('express').Router();
const {
    addThought, 
    removeThought,
    addReaction,
    removeReaction,
    getThoughtById,
    getThought,

} = require("../../controllers/thought-controller");

// /api/thoughts/<userId>
router.route('/:userId')
    .get(getThought)
    .post(addThought);
    


// api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId')
    .get(getThoughtById)
    .put(addReaction)
    .delete(removeThought);

router.route('/:userId/:thoughtId/:replyId')
    .delete(removeReaction);


module.exports = router;