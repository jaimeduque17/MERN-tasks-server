const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

require('dotenv').config({path: '.env'});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB Connected');
    } catch (error) {
        console.log(error);
        process.exit(1); // Stop the app
    }
}

module.exports = connectDB;