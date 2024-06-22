const mongoose = require('mongoose');


//user schema

const transactionSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        transactionType: {
            type: String,
            enum: [
                "Income",
                "Expenses"
            ],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            enum: [
                "Food",
                "Transportation",
                "Entertainment",
                "Shopping",
                "Utilities",
                "Health",
                "Travel",
                "Education",
                "Personal",
                "Groceries",
                "Bills",
                "Building",
                "Uncategorized",
            ],
            required: true,
        },
        color: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required : true,
        },
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },
        date: {
            type: Date,
            default: Date.now(),
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

transactionSchema.pre('remove', async function(next) {
    try {
        const Account = require("./Account");
        // Find the account related to this transaction
        const account = await Account.findOne({ transactions: this._id });

        if (account) {
            // Remove the transaction from the account's transactions array
            await Account.updateOne(
                { _id: account._id },
                { $pull: { transactions: this._id } }
            );
        }

        next();
    } catch (err) {
        next(err);
    }
});

//model
const Transaction = mongoose.model("Transaction",transactionSchema);



module.exports = Transaction;