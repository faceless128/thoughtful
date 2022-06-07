const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            validate: {
                validator: function(v) {
                  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            },
            trim: true,
            unique: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

// get total count of comments and replies on retrieval

UserSchema.virtual('friendCount').get(function() {
    if (this.friends) {
        return this.friends.length;
    }
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;
