const { response } = require('express');
const {User, Thought} = require('../models');

const thoughtController = {
    getThought({params}, res) {
        Thought.find({})
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    },

    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'User not found'})
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    
    addThought({params, body}, res){
        console.log(body);
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: params.userId},
                    {$push: {thoughts: _id}},
                    {new: true}
                )
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'No User found'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    
    removeThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(400).json({message: "no thought with this id"})
                }
                return Thought.findOneAndUpdate(
                    {_id: params},
                    {$pull: {thoughts: params.thoughtId}},
                    {new: true}
                )
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: "No pizza found with this id!"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err=> res.json(err))
    },

}