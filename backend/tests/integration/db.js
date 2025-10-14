const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env.test' }); 

const TEST_MONGO_URI = process.env.TEST_MONGO_URI;

const connect = async () => {
    if (!TEST_MONGO_URI) {
        throw new Error("Check .env");
    }
    
    await mongoose.connect(TEST_MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const closeDatabase = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    }
};

const clearDatabase = async () => {
    if (mongoose.connection.readyState === 1) { 
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    }
};

module.exports = {
    connect,
    closeDatabase,
    clearDatabase
};