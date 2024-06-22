const mongoose = require('mongoose');
const Account = require("./Account");
const Transaction = require("./Transaction");

//user schema

const userSchema = new mongoose.Schema({
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        hasCreatedAccount: {
            type: Boolean,
            required: false,
        },
        accounts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
        }]
    },
    {
        timestamps: true,
        toJSON: {virtuals : true},
    }
);

userSchema.pre('remove', async function(next) {
    try {
        // Find all accounts related to this user
        const accounts = await Account.find({ createdBy: this._id });

        // Delete each account and its related transactions
        for (const account of accounts) {
            await account.remove();
        }

        next();
    } catch (err) {
        next(err);
    }
});


//model
const User = mongoose.model("User",userSchema);



module.exports = User;