const Account = require("../../model/Account");
const Transaction = require("../../model/Transaction");
const User = require("../../model/User");
const { appErr } = require("../../utils/appErr");

//create
const createTransactionCtrl = async (req, res,next) => {
  const {name, amount, notes, transactionType, account, category} = req.body;
  try {
    const userFound = await User.findById(req.user);
    if(!userFound) {
      return next(appErr("User not found",404));
    }
    const accountFound = await Account.findById(account);
    if(!accountFound) {
      return next(appErr("Account not found",404));
    }
    console.log(req.user);
    const transaction = await Transaction.create({
      createdBy: req.user,
      amount,
      notes,
      account,
      transactionType,
      category,
      name,
      
    });

    accountFound.transactions.push(transaction._id);
    await accountFound.save();
    res.json({ 
      status : "success",
      data : transaction,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//all
const getTransactionsCtrl = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//single
const getTransactionCtrl = async (req, res, next) => {
  try {
    const {id} = req.params;
    const transaction = await Transaction.findById(id);
    res.json({
      status: "success",
      data: transaction,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//delete
const deleteTransactionCtrl = async (req, res, next) => {
  try {
    const {id} = req.params;
    const transaction = await Transaction.findById(id);
    await transaction.remove();
    res.status(200).json({
      status : "success",
      data: null,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//update
const updateTransactionCtrl = async (req, res, next) => {
  try {
    const {id} = req.params;
    const transaction = await Transaction.findByIdAndUpdate(id, req.body,{
      new: true,
      runValidators: true,
    });
    res.status(200).json({
        status : "success",
        data: transaction,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  createTransactionCtrl,
  getTransactionsCtrl,
  getTransactionsCtrl,
  getTransactionCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
};
  