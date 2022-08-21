const {Schema, model, Types} = require('mongoose');

const ThoughtSchema = new Schema (
    {
       thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength:280,
       },
       createdAt: {
            type: Date,
            default: Date.now
            //use getter method to format the timestamp on query
       },
       username: {
            type: String,
            required: true,
       },
       reactions: [
        {
            type : Schema.Types.ObjectId,
            ref: 'Reaction'
        }
       ]
       //reaction array of nested documents create with the reaction schema
    }
);


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
