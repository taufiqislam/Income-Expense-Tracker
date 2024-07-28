require('dotenv').config({ path: './.env' }); // .env file is in the server folder

const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in the environment variables.');
        }
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB connected successfully');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

dbConnect();
