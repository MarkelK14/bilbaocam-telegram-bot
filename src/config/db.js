const mongoose = require('mongoose');

let mongo_url;

switch (process.env.NODE_ENV) {
    case 'DEVELOPMENT':
        console.log('Connecting to MongoDB in DEVELOPMENT mode...');
        mongo_url = process.env.MONGO_DEVELOPMENT_URL;
        break;
    case 'PRODUCTION':
        console.log('Connecting to MongoDB in PRODUCTION mode...');
        mongo_url = process.env.MONGO_PRODUCTION_URL;
        break;
    default:
        throw new Error('NODE_ENV must be either DEVELOPMENT or PRODUCTION');
}

mongoose.connect(mongo_url);