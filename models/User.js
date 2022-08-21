const {Schema, model} = require('mongoose');


const UserSchema = new Schema({
    username: {
        type: String
        /*
            Unique
            Required
            Trimmed

        */
    },
    email: {
        type: String
        /*
            Required
            Unique
            Must match a valid email address (look into Mongoose's matching validation)

        */
    },
    thoughts: {
        // Array of _id values referencing the Thought model
    },
    friends: {
        //Array of _id values referencing the User model (self-reference)
    }
});

const User = model('User', UserSchema);

module.exports = User;