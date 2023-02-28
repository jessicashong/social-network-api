const { Schema, model } = require('mongoose');
// const reactionSchema = require('./Reaction');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //Mongoose's matching validation
            //regex?
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
        }
);

userSchema
.virtual('friendCount')
.get(function () {
    return this.friends.length;
});

// const Thought = model('thought', thoughtSchema);
const User = model('user', userSchema);

module.exports = User;