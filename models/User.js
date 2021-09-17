const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please use a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thoughts',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ],
},
{
    toJSON: {
        virtuals: true
    },
    id: false,  
},
);

// get friend count of user 
UserSchema.virtual('friendCount').get(function () {
    return this.comments.length;
});

const User = model("User", UserSchema);

module.exports = User;
