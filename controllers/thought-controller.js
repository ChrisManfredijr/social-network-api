
const { User, Thought } = require('../models');

const thoughtController = {
    getThought({ }, res) {
        Thought.find({})
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    },

    addThought({ body }, res) {
        Thought.create(body)
            .then(({ dbThoughtData }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true, run }

                )
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No User found' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },



    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'no thought found with this ID' })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    updateThought({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.hson(err))
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(400).json({ message: "no thought with this id" })
                }
                return Thought.findOneAndUpdate(
                    { _id: params },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "no user found" })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    },
    
    removeReaction({ params }, res) {
        Reaction.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }

}

module.exports = thoughtController;