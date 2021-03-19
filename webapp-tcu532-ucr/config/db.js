const mongoose = require('mongoose');
const config = require('config');
const DB_URI = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(
            DB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );
        console.log('MongoDB Atlas is Connected!');

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;