const mongoose = require('mongoose');


//user schema

const accountSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        accountType: {
            type: String,
            enum: [
                "Savings",
                "Investments",
                "Checking",
                "Credit Card",
                "Building",
                "School",
                "Project",
                "Utilities",
                "Travel",
                "Personal",
                "Groceries",
                "Entertainment",
                "Loan",
                "Cash Flow",
                "Education",
                "Uncategorized",
            ],
            required: true,
        },
        initialBalance: {
            type: Number,
            default: 0,
        },
        transactions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transaction",
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required : true,
        },
        notes: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        toJSON: {virtuals : true},
    }
);

accountSchema.pre('remove', async function(next) {
    try {

        const Transaction = require("./Transaction");
        const User = require("./User");
        await Transaction.deleteMany({ account: this._id });

        // Remove this account from the user's accounts array
        await User.updateOne(
            { _id: this.createdBy },
            { $pull: { accounts: this._id } } 
        );

        next();
    } catch (err) {
        next(err);
    }
});


//model
const Account = mongoose.model("Account",accountSchema);




module.exports = Account;