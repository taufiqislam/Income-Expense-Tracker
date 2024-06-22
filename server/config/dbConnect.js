const mongoose = require("mongoose");

// connect

const dbConnect = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://cryomancer148:proto148type@cluster0.wet9jqr.mongodb.net/Income-Expense?retryWrites=true&w=majority&appName=Cluster0");
        console.log("DB connected successfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

dbConnect();